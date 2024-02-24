import axios from "axios";
import { io } from "socket.io-client";

export const ProviderService = {
  getConnectionToProvider: async (
    encodedStringBtoA: string,
    selectedProvider: string
  ) => {
    const response = await axios.get(
      `http://10.24.128.192:5000/fetchresources?cloud_type=${selectedProvider}`,
      {
        headers: {
          Authentication: encodedStringBtoA,
        },
      }
    );
    console.log("service called");
    return response.data;
  },
  postConnectionToProvider: async (providerData: any) => {
    console.log("socket connection called");
    const socket = io("http://10.24.128.192:5000/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });

    socket.emit("migrate", providerData);
    socket.on("result", (data) => {
      console.log("data from backednd");
      console.log(data);
      if (data) return data;
    });
  },
};
