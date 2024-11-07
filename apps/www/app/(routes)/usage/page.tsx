import Leftsidebar from "@/components/ui/Leftsidebar";
import Rightsidebar from "@/components/ui/Rightsidebar";
import Usagehome from "@/components/ui/Usagehome";

export default function Usagepage() {
  return (
    <div>
      <div className="flex flex-row w-full h-screen  overflow-hidden overflow-x-hidden ">
        <div className="w-[16rem] p-6 h-[]">
          <Leftsidebar />
        </div>

        <div className="flex w-8/12 overflow-y-auto">
          <Usagehome />
        </div>

        <div className="">
          <Rightsidebar />
        </div>
      </div>
      <hr className="w-full  border" />
    </div>
  );
}
