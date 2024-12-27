import WorkflowsDock from "@/components/motion-ui/workflow-dock";
import { Mail, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Mail[]> {
  // Fetch data from your API here.
  return [
    { WorkflowId: "INT001", Workflow: "Salesforce", Status: "Running", Services: "01" },
    { WorkflowId: "INT002", Workflow: "HubSpot", Status: "Paused", Services: "03" },
    { WorkflowId: "INT003", Workflow: "Slack", Status: "Stopped", Services: "05" },
    { WorkflowId: "INT004", Workflow: "Zoom", Status: "Running", Services: "02" },
    { WorkflowId: "INT005", Workflow: "Asana", Status: "Paused", Services: "04" },
    { WorkflowId: "INT006", Workflow: "Trello", Status: "Stopped", Services: "01" },
    { WorkflowId: "INT007", Workflow: "Jira", Status: "Running", Services: "03" },
    { WorkflowId: "INT008", Workflow: "Zendesk", Status: "Paused", Services: "02" },
    { WorkflowId: "INT009", Workflow: "Google Drive", Status: "Stopped", Services: "05" },
    { WorkflowId: "INT010", Workflow: "Dropbox", Status: "Running", Services: "04" },
    { WorkflowId: "INT011", Workflow: "GitHub", Status: "Paused", Services: "02" },
    { WorkflowId: "INT012", Workflow: "Bitbucket", Status: "Stopped", Services: "03" },
    { WorkflowId: "INT013", Workflow: "Mailchimp", Status: "Running", Services: "01" },
    { WorkflowId: "INT014", Workflow: "Shopify", Status: "Paused", Services: "05" },
    { WorkflowId: "INT015", Workflow: "WordPress", Status: "Stopped", Services: "04" },
  ];

}

export default async function Mails() {
  const data = await getData();

  return (
    <div className="container px-5 pb-5 md:px-2">
      <DataTable columns={columns} data={data} />
      {/* <WorkflowsDock /> */}
    </div>
  );
}
