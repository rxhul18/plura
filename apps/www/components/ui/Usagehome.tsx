export default function Usagehome() {
  return (
    <div className=" h-full  flex flex-col  items-center justify-center  w-full">
      <h1 className="font-semibold text-3xl text-white top-0 flex justify-start items-center w-full h-12 ml-10 ">
        {" "}
        Introduction
      </h1>
      <div className="w-full flex items-start justify-start  p-2 ml-6 tracking">
        <div className="container  font-normal   w-[24rem] text-base text-muted-foreground tracking-wide">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start justify-start  h-full">
        <div className="w-[80%] h-full flex flex-col items-start justify-start ml-10 gap-y-10">
          <div className="container  font-normal  text-start w-full text-base text-white ">
            This is NOT a component library. It's a collection of re-usable
            components that you can copy and paste into your apps.
          </div>
          <div className="container  font-normal  text-start w-full text-base text-white ">
            What do you mean by not a component library? I mean you do not
            install it as a dependency. It is not available or distributed via
            npm. Pick the components you need.
          </div>
          <div className="container  font-normal  text-start w-full text-base text-white ">
            Copy and paste the code into your project and customize to your
            needs. The code is yours. Use this as a reference to build your own
            component libraries.
          </div>
        </div>
      </div>
    </div>
  );
}
