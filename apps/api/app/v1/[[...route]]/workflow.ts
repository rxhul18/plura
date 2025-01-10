import { checkLogin } from "@/app/actions/checkLogin";
import { auth } from "@plura/auth";
import { prisma } from "@plura/db";
import { Hono } from "hono";

interface Node {
    id?: string;
    connections: {
        sourceOf: string[];
        targetOf: string[];
    },
    data: {
        label: string;
        selected?: string;
        serviceId?: string;
    },
    position: {
        x: number;
        y: number;
    },
    type: "agentNode" | "memoryNode" | "serviceNode";
}

interface Edge {
    id?: string;
    source: string;
    target: string;
}

interface WorkflowRequestBody {
    projectId: string;
    workflowName: string;
    nodes: Node[];
    edges: Edge[];
}

const app = new Hono()
    .use(checkLogin)
    // Submit workflow configuration
    .post("/", async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: c.req.raw.headers,
            });
            const userId = session?.user.id;
            if (!userId) {
                return c.json({ message: "Missing user id", status: 400 }, 400);
            }
            const body: WorkflowRequestBody = await c.req.json();
            if (!body) {
                return c.json({ message: "Missing body", status: 400 }, 400);
            }

            const { projectId, workflowName, nodes, edges } = body;

            if (!Array.isArray(nodes) || !Array.isArray(edges)) {
                return c.json({ message: "Invalid nodes or edges", status: 400 }, 400);
            }

            // Begin a transaction
            const transactionResult = await prisma.$transaction(async (prisma) => {
                // Create workflow
                const workflow = await prisma.workflow.create({
                    data: {
                        name: workflowName,
                        status: "Running",
                        services: nodes.filter((node) => node.type === "serviceNode").length,
                        projectId,
                    },
                });

                if (!workflow) {
                    throw new Error("Failed to create workflow");
                }

                // Create nodes
                const nodePromises = nodes.map(async (node) => {
                    const createdNode = await prisma.node.create({
                        data: {
                            type: node.type,
                            workflowId: workflow.id,
                            position: {
                                create: {
                                    x: node.position.x,
                                    y: node.position.y,
                                },
                            },
                            data: {
                                create: {
                                    label: node.data.label,
                                    selected: node.data.selected,
                                    serviceId: node.data.serviceId,
                                },
                            },
                            connections: {
                                create: {
                                    sourceOf: node.connections.sourceOf,
                                    targetOf: node.connections.targetOf,
                                },
                            },
                        },
                    });
                    return createdNode;
                });

                await Promise.all(nodePromises);

                // Create edges
                const edgePromises = edges.map(async (edge) => {
                    await prisma.edge.create({
                        data: {
                            source: edge.source,
                            target: edge.target,
                            workflowId: workflow.id,
                        },
                    });
                });

                await Promise.all(edgePromises);

                return workflow;
            });

            if (!transactionResult) {
                throw new Error("Failed to create workflow");
            }

            return c.json({ workflow: transactionResult, status: 201 }, 201);
        } catch (error) {
            console.error("Unexpected error while creating workflow:", error);
            return c.json({ message: "Internal server error", status: 500 }, 500);
        }
    })
    // Fetch workflow statistics
    .post("/stats", async (c) => {
        try {
            const body = await c.req.json();
            if (!body || !body.projectId) {
                return c.json({ message: "Missing body", status: 400 }, 400);
            }

            const workflows = await prisma.workflow.findMany({
                where: {
                    projectId: body.projectId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    services: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return c.json({ workflows }, 200);
        } catch (error) {
            return c.json({ message: "Error fetching workflows", status: 400 }, 400);
        }
    })
    // Fetch specific workflow
    .get("/:workflowId", async (c) => {
        try {
            const workflowId = c.req.param("workflowId");
            if (!workflowId) {
                return c.json({ message: "Missing workflowId", status: 400 }, 400);
            }

            const workflow = await prisma.workflow.findUnique({
                where: {
                    id: workflowId,
                },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    nodes: {
                        include: {
                            position: {
                                select: {
                                    x: true,
                                    y: true,
                                }
                            },
                            data: {
                                select: {
                                    label: true,
                                    selected: true,
                                    serviceId: true,
                                }
                            },
                            connections: {
                                select: {
                                    sourceOf: true,
                                    targetOf: true,
                                }
                            },
                        },
                    },
                    edges: {
                        select: {
                            id: true,
                            source: true,
                            target: true,
                        }
                    },
                },
            });

            if (!workflow) {
                return c.json(
                    { message: "Workflow not found", status: 404 },
                    404
                );
            }

            return c.json({ workflow }, 200);

        } catch (error) {
            console.error("Unexpected error while fetching specific workflow:", error);
            return c.json(
                { message: "Internal server error", status: 500 },
                500
            );
        }
    });

export default app;
