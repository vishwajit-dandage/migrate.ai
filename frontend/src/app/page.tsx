import { Connect } from "@/components/Connect";
import DropDownComp from "@/components/DropDownComp";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="">
      <Navbar />
      <Layout />
      <div className="p-4 shadow-sm text-center border-t-[1px] mt-2">
        @migrate.ai
      </div>
      {/* <Button>Send Data</Button> */}
    </div>
  );
};

export default page;
