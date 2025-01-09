import React, { useState } from "react";
import { ArrowRight, Github, Settings, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type Integration = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
};

const integrations: Integration[] = [
  {
    id: "1",
    name: "Service 1",
    description:
      "This is a more detailed description for Service 1, which can be long and requires truncation until the user decides to see more details.",
    icon: <ArrowRight className="text-black" />,
    iconBg: "bg-pink-100",
  },
  {
    id: "2",
    name: "Service 2",
    description: "Service 2 provides additional functionality.",
    icon: <Settings className="text-black" />,
    iconBg: "bg-green-100",
  },
  {
    id: "3",
    name: "Service 3",
    description: "Description of Service 3 with details.",
    icon: <Github className="text-black" />,
    iconBg: "bg-blue-100",
  },
  {
    id: "4",
    name: "Service 4",
    description: "Description of Service 4.",
    icon: <Github className="text-black" />,
    iconBg: "bg-yellow-100",
  },
];

const IntegrationsComponent: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {integrations.map((integration) => (
          <Card
            key={integration.id}
            className=" p-2 sm:p-3  w-full h-auto flex flex-col"
          >
            <div
              className={`text-sm p-1 rounded-lg w-fit ${integration.iconBg} mb-2`}
            >
              {integration.icon}
            </div>
            <h3 className="text-sm font-semibold ">{integration.name}</h3>

            <Content description={integration.description} />

            <hr className="my-2 " />
            <Button variant="outline" size="sm" className="w-fit">
              <Plus className=" dark:text-white" />
              <span>Connect</span>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Content: React.FC<{ description: string }> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const shortDescription = description.slice(0, 80); // Shorten the preview further

  return (
    <div className="flex-grow mb-2">
      <p className="text-xs ">
        {expanded ? description : shortDescription}
        {description.length > 80 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className=" font-bold cursor-pointer"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
    </div>
  );
};

export default IntegrationsComponent;
