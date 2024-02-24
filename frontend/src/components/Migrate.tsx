"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { io } from "socket.io-client";
import { ProviderService } from "../../services/provider";
import { useProviderDataPost } from "@/store/app";

const Migrate = () => {
  const [socketInstance, setSocketInstance] = useState<any>();
  const [result, setResult] = useState();
  const { providerData } = useProviderDataPost();

  //   useEffect(() => {
  //     const socket = io("localhost:5001/", {
  //       transports: ["websocket"],
  //       cors: {
  //         origin: "http://localhost:3000/",
  //       },
  //     });

  //     setSocketInstance(socket);

  //     socket.emit("migrate", value);
  //     socket.on("result", (data) => {
  //       console.log("data from backedn");
  //       console.log(data);
  //       if (data) setResult(data);
  //     });
  //     return function cleanup() {
  //       socket.disconnect();
  //     };
  //   }, [buttonStatus]);
  const handleMigrate = () => {
    console.log("migrate called")
    const response = ProviderService.postConnectionToProvider(providerData);
    console.log("response from backend coming", response);
  };
  return (
    <div className="flex justify-end mt-3">
      <Button className="" onClick={handleMigrate}>
        Migrate
      </Button>
    </div>
  );
};

export default Migrate;
