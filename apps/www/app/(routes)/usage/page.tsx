import Leftsidebar from "@/components/ui/Leftsidebar";
import Rightsidebar from "@/components/ui/Rightsidebar";
import Usagehome from "@/components/ui/Usagehome";

export default function Usagepage() {
  return (
    <div className=" w-full h-screen  flex flex-row ">
      <div className=" w-[16rem] p-6  ">
        <Leftsidebar />
      </div>

      <div className="flex  w-8/12 ">
        <Usagehome />
      </div>
      <div className="">
        <Rightsidebar />
      </div>
    </div>
  );
}
