import Component from "./Link";

export default function Rightsidebar() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[16rem] lg:fixed lg:right-0 lg:top-0 lg:h-full lg:overflow-y-auto">
      <div className="">

        <div className="overflow-y-auto">
          <Component />
        </div>
      </div>
    </div>
  );
}
