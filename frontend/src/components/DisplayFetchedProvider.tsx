import React, { useRef, useState } from "react";
import Image from "next/image";
import svgIcon from "../../assets/svg/ApiGateway.svg";
import regionIcon from "../../assets/icons/region.png";
import Ec2 from "../../assets/svg/Ec2.svg";
import Lamda from "../../assets/svg/lamda.svg";

import {
  useCloudProviderStore,
  useProviderDataPost,
  useStoreProvider,
} from "@/store/app";

type SectionProps = {
  ProviderData: any[];
  svgIcon: any;
  section: string;
  region: string;
};

const Section = ({ ProviderData, svgIcon, section, region }: SectionProps) => {
  const { saveProvider, providerData } = useProviderDataPost();
  const { provider } = useCloudProviderStore();
  const reference = useRef<any>();
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const handleClick = (index: number, name: any) => {
    // Toggle the clicked state for the box at the given index
    setClickedBoxes((prevClickedBoxes) => {
      const newClickedBoxes = [...prevClickedBoxes];
      newClickedBoxes[index] = !newClickedBoxes[index];
      return newClickedBoxes;
    });
    if (!clickedBoxes[index]) {
      saveProvider(provider, region, section, ProviderData[index]);
    }
    console.log("provider data saved here ", providerData);
  };
  return (
    <>
      <div className="px-3 font-medium italic uppercase">{section}</div>
      <div className="flex gap-5">
        {ProviderData?.map((value, index) => (
          <div
            key={index}
            className={`border-[1px] p-1 ${
              clickedBoxes[index]
                ? "border-blue-500 bg-gray-300"
                : "border-black"
            }`}
            onClick={() => handleClick(index, value)}
          >
            <Image src={svgIcon} alt="My SVG" width={50} height={50} />
            <div className=" text-xs" ref={reference}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const DisplayFetchedProvider = () => {
  const { providerData: DATA } = useStoreProvider();
  return (
    <div className="flex gap-3 flex-col">
      {/* <div>
        <div>Apigateway</div>
        <Section
          ProviderData={DATA.aws["us-east-1"].apigateway}
          svgIcon={svgIcon}
          section="apigateway"
        />
      </div> */}
      <div className="p-2">
        <div className="flex gap-3  items-center">
          <Image src={regionIcon} width={25} height={20} alt="region" />
          <div className=" text-purple-700 font-mono">us-east-1</div>
        </div>
        <div className="px-3 py-4 font-mono text-slate-900">Resources</div>
        <Section
          ProviderData={DATA?.aws["us-east-1"].ec2}
          svgIcon={Ec2}
          section="ec2"
          region="us-east-1"
        />
      </div>
      {/* <div>
        <div>Lambda</div>
        <Section
          ProviderData={DATA.aws["us-east-1"].lambda}
          svgIcon={Lamda}
          section="lambda"
        />
      </div> */}
    </div>
  );
};

export default DisplayFetchedProvider;
