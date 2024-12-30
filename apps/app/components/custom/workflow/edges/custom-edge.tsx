import React from "react";
import { X } from "lucide-react";
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} />
      <path
        d={edgePath}
        fill="none"
        strokeWidth={20}
        stroke="transparent"
        className="react-flow__edge-interaction"
      />
      <EdgeLabelRenderer>
        <button
          aria-label="Delete Edge"
          className={`absolute p-1 rounded-full flex hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={() =>
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
          }
        >
          <X className={` w-4 h-4 text-red-500 `} />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
