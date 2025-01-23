import React from "react";
import SectionLabel from "../section/section.label";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApiSkeleton() {
  return (
    <div className="w-full container">
      <div className="flex items-start justify-between gap-4">
        <SectionLabel
          label="API Settings"
          msg="Next we will get you to create your first API. This is the API that you will be protecting with Unkey. You can create as many APIs as you like, but for now we’ll just create one"
        />
      </div>
      <div className="border rounded-lg p-6 mt-5 bg-secondary shadow-md min-w-full max-w-lg">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-2/3 mt-2" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
