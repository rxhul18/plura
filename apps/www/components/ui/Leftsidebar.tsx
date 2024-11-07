import { SiteFooter } from "../custom/site/footer";
import { ScrollArea } from "./scroll-area";

export default function LeftSidebar() {
  const items = [
    { label: "Introduction" },
    { label: "Getting Started" },
    { label: "Features" },
    { label: "Pricing" },
    { label: "FAQ" },
    { label: "Blog" },
    { label: "Contact Us" },
    { label: "Introduction" },
    { label: "Getting Started" },
    { label: "Features" },
    { label: "Pricing" },
    { label: "FAQ" },
    { label: "Blog" },
    { label: "Contact Us" },
    { label: "Pricing" },
    { label: "FAQ" },
    { label: "Blog" },
    { label: "Contact Us" },
  ];

  return (
    <div className="flex flex-col h-full fixed left-0 top-8 w-[16rem] border-r border-border font-semibold text-sm p-4 ">
      <ScrollArea className="w-[16rem]">
        <div className="flex flex-col ml-4 w-full">
          <h1 className="text-white h-12 w-full text-base flex items-center">
            Getting Started
          </h1>
          <div className="w-full h-full">
            {items.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="text-white w-full h-10 flex items-center hover:opacity-90 cursor-pointer "
              >
                {item.label}
              </div>
            ))}
          </div>
          <SiteFooter />
        </div>
      </ScrollArea>
    </div>
  );
}
