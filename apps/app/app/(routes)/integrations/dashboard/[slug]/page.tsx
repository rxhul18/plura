import { Mail, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Mail[]> {
  // Fetch data from your API here.
  return [
    { IntegrationId: "INT001", Integration: "Salesforce", Status: "Running", Services: "01" },
    { IntegrationId: "INT002", Integration: "HubSpot", Status: "Paused", Services: "03" },
    { IntegrationId: "INT003", Integration: "Slack", Status: "Stopped", Services: "05" },
    { IntegrationId: "INT004", Integration: "Zoom", Status: "Running", Services: "02" },
    { IntegrationId: "INT005", Integration: "Asana", Status: "Paused", Services: "04" },
    { IntegrationId: "INT006", Integration: "Trello", Status: "Stopped", Services: "01" },
    { IntegrationId: "INT007", Integration: "Jira", Status: "Running", Services: "03" },
    { IntegrationId: "INT008", Integration: "Zendesk", Status: "Paused", Services: "02" },
    { IntegrationId: "INT009", Integration: "Google Drive", Status: "Stopped", Services: "05" },
    { IntegrationId: "INT010", Integration: "Dropbox", Status: "Running", Services: "04" },
    { IntegrationId: "INT011", Integration: "GitHub", Status: "Paused", Services: "02" },
    { IntegrationId: "INT012", Integration: "Bitbucket", Status: "Stopped", Services: "03" },
    { IntegrationId: "INT013", Integration: "Mailchimp", Status: "Running", Services: "01" },
    { IntegrationId: "INT014", Integration: "Shopify", Status: "Paused", Services: "05" },
    { IntegrationId: "INT015", Integration: "WordPress", Status: "Stopped", Services: "04" },
  ];

}

export default async function Mails() {
  const data = await getData();

  return (
    <div className="container px-5 pb-5 md:px-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
