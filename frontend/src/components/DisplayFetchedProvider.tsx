import React, { useRef, useState } from "react";
import DATA from "../../test.json";
import Image from "next/image";
import svgIcon from "../../assets/svg/ApiGateway.svg";
import Ec2 from "../../assets/svg/Ec2.svg";
import Lamda from "../../assets/svg/lamda.svg";
import { useProviderDataPost } from "@/store/app";

type SectionProps = {
  ProviderData: any[];
  svgIcon: any;
  section: string;
};

const Section = ({ ProviderData, svgIcon, section }: SectionProps) => {
  const { saveProvider, providerData } = useProviderDataPost();
  // const provider = useProviderDataPost((state) => state.providerData);
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
      saveProvider(section, ProviderData[index]);
    }
    console.log("provider data saved here ", providerData);
  };
  // console.log("clicked: ", clickedBoxes);
  return (
    <>
      <div className="flex gap-5">
        {ProviderData.map((value, index) => (
          <div
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
  return (
    <div className="flex gap-3 flex-col">
      <div>
        <div>Apigateway</div>
        <Section
          ProviderData={DATA.aws["us-east-1"].apigateway}
          svgIcon={svgIcon}
          section="apigateway"
        />
      </div>
      <div>
        <div>Ec2</div>
        <Section
          ProviderData={DATA.aws["us-east-1"].ec2}
          svgIcon={Ec2}
          section="ec2"
        />
      </div>
      <div>
        <div>Lambda</div>
        <Section
          ProviderData={DATA.aws["us-east-1"].lambda}
          svgIcon={Lamda}
          section="lambda"
        />
      </div>
    </div>
  );
};

export default DisplayFetchedProvider;
