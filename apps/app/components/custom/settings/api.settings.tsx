/* eslint-disable react/no-unescaped-entities */

import { ApiButton } from "./api.button"
import SectionLabel from "../section/section.label"
import { curnProjectData } from "@/actions/project"
import ApiKey from "./api.key";

export default async function ApiSettings() {

  const projectId = "27f0281c-716f-4f46-b1e8-c8661b5fc34b";
  const data = await curnProjectData({ projectId });

  if (!data || !data.data) {
    return <div></div>;
  }
  return (
    <div className="w-full container">
      <div>
        <div className="flex items-start justify-between gap-4">
          <SectionLabel
            label="API Settings"
            msg="Next we will get you to create your first API. This is the API that you will be protecting with Unkey. You can create as many APIs as you like, but for now we’ll just create one"
          />
        </div>
      </div>
      <div className="border rounded-lg p-6 mt-5 bg-secondary shadow-md min-w-full max-w-lg">
        <h2 className="text-primary">API ID</h2>
        <p className="mt-1 text-sm text-gray-500">
          This is your api ID. It's used in some API calls.
        </p>
        {data?.data?.apiKey === "" && (
          <ApiButton />
        )}
        {data?.data?.apiKey !== "" && (
          <ApiKey apiKey={data.data.apiKey}/>
        )}
      </div>
    </div>
  )
}
