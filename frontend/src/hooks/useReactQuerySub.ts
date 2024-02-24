import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    const websocket = new WebSocket("http://localhost:5000/fetchresources?cloud_type=aws");
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const queryKey = [...data.entity, data.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};
