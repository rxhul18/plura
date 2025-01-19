/* eslint-disable react/no-unescaped-entities */

import { ApiButton } from "./api.button";
import SectionLabel from "../section/section.label";
import { curnProjectData } from "@/actions/project";
import ApiKey from "./api.key";
import { Card } from "@/components/ui/card";

export default async function ApiSettings() {
  const projectId = "27f0281c-716f-4f46-b1e8-c8661b5fc34b";
  const data = await curnProjectData({ projectId });

  if (!data || !data.data) {
    return <div></div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      <div className="lg:col-span-1">
        <SectionLabel
          label="API Settings"
          msg="Next we will get you to create your first API. This is the API that"
        />
      </div>
      <div className="lg:col-span-3 w-full flex justify-start lg:justify-start ">
        <Card className="">
          <div className="border rounded-lg p-6 bg-secondary shadow-md">
            <h2 className="text-primary">API ID</h2>
            <p className="mt-1 text-sm text-gray-400">
              This is your api ID. It's used in some API calls.
            </p>
            {data?.data?.apiKey === "" && <ApiButton />}
            {data?.data?.apiKey !== "" && <ApiKey apiKey={data.data.apiKey} />}
          </div>
        </Card>
      </div>
    </div>
  );
}
