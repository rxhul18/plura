import Leftsidebar from "@/components/ui/Leftsidebar";
import Rightsidebar from "@/components/ui/Rightsidebar";
import Usagehome from "@/components/ui/Usagehome";

export default function Usagepage() {
  return (
    <div className=" w-full h-full mt-5 flex flex-row ">
      <div className=" w-[16rem]  ">
        <Leftsidebar />
      </div>

      <div className="flex items-center justify-center h-screen overflow-y-scroll w-8/12 ">
        <Usagehome />
      </div>
      <div className="">
        <Rightsidebar />
      </div>
    </div>
  );
}
