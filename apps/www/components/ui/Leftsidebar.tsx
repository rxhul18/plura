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
  ];

  return (
    <div className="flex flex-col h-screen w-full overflow-y-auto border-r border-border font-semibold text-sm">
      <div className="flex flex-col ml-10">
        <span className="text-white h-12 w-full text-base flex items-center">
          Getting Started
        </span>
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
      </div>
    </div>
  );
}
