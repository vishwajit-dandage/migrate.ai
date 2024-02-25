import axios from "axios";
import { resolve } from "path";
import { io } from "socket.io-client";

export const ProviderService = {
  getConnectionToProvider: async (
    encodedStringBtoA: string,
    selectedProvider: string
  ) => {
    const response = await axios.get(
      `http://localhost:5000/fetchresources?cloud_type=${selectedProvider}`,
      {
        headers: {
          Authentication: encodedStringBtoA,
        },
      }
    );
    console.log(response);
    console.log("service called");
    return response;
  },
  postConnectionToProvider: async (
    providerData: any,
    current: string,
    target: string
  ) => {
    console.log("socket connection called");
    const socket = io("http://10.24.128.192:5000/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });

    // socket.emit("migrate", providerData);
    const test = {
      type: "service_account",
      project_id: "synthetic-cargo-415216",
      private_key_id: "d515f7f3f1fd7af93cde6dd4f85058c4786bb11b",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBpV9UWrPjJ6xK\n+ExA/kP2DGFsG7JK7KY/yC6yn5iJ+2etS4fYITLUjck3MTNQ7AhTKCQLUAXNTZ9c\nuzgJoDLB6il6hrhXRynQucOrLmL4FqgV5ymCwQwhyMilZJhgI2hiwjcgsFvnIOlW\n1foPb9BKb5EDPj0uOEIjw+ICTeo1VSDk/6Y8tycCGe1okrK9KRYmsP8GUX2zZQOm\nRc1Evyx0Z/AI2CfwYVmMfpNR4KtN+Bo6sXkP5TiRS9fYDxA1TXZCSI7BFIO5Z4Ck\nLh0KCpM7RJS2rYwY4KA6y3cu8XnolpvKTZiYoMOafNgq9m1akARCOz/fr2uGrMn2\nFW29CywhAgMBAAECggEABJnunDVEiXz/l89zFmdES6QrK3O0Bpo9cA4MaAOpTvwJ\nkGFXUsAlMk5FLfnOD5nwL7OoOZmW7bQuuXgcYoQrOJbdEfOCDVbcTEChwN9LDDyT\nlWOnBZubM3FPLTjo8v3cZN5bC3yNTn5mdQEEHlpIj4A7qKFRuFevYKSuqeHakxZO\nYvEWoEZNda3QJxlKuYfEiC4zZzWJLG4qhGSD/eSPVPa23WGTQHQYPWyLpmtd+QWl\n4eNTQPb5XljVz+uC9NL83Oi/o7lUFqw0CD/9qy8LMvOJslCxPwIFMX0d+bH09F80\nKt48Nxjd5ttihfkO/uKpr5QoIjRJu+l14ViWN6shXQKBgQDwznZ8iaZkCfLtN0X3\nb4YwnKohOLxg6ydiz0R2+uFhI9tvQFE8P6hhdhIKD3hXYtsqOisWMi4K9/ygKBON\nTjy5dV5Q8ivnJB/8pzWhS47E9W6xyd+T/EJvfSYMf2ACHatmWGsNKZu9GlMlV/jD\nlp5Tf+hKgvCqAF4JCcXXy6n9rQKBgQDN3Sq/2nL9FcfDVz4MLCSCgFScOa4zmOGJ\nPWqRMnkbqFOmyIlyZ7dqqn6bbjccKqF+m0QnY/yUQA1PpZKRMM32pHTGbDzFMBbH\n2UsvpI6Q1Pt3hM22Z3RxWHPmQe3/CJS7XykDoc2qnA/9pWZN1pOa7/gDunYv1xMS\nflZ60TmOxQKBgQDYBd91SWbjR6mN9I/nsTyIT4Kv2t3jdBEZKycYNWgKZMhtvR0j\nF1hOVkVIkSg7/IrwDs6oUsvLOzx90HX5xb3kAc5if12zNU0cskQCNm4Vcrei9p6D\ne0F+Ep8Xhwzx2PvyDE+8tx7nPb5pOcoIbA4Miiow7dZIK5wwL3w0YphU4QKBgEmU\nQzNPYMoUftHS3Np87I+4ToWIGDtY6UOkL/K1l5PLFhsGkhnR+Dyns5jaS9hFZHNc\nC4AIvL5AJoHRLBG43+TH4vUIuq/AAGRtxfHBXzNk7HxLezs2vufENaiW5/m/l2lh\nGceyjU/td8mw1F/90cQPARZUDuoKdUam4UIEhg4BAoGATZo2me34DGy4u1TWfN6x\nsUqVdmDc0TpYtRZrGhTDIIT+WUm0z6FC7jM8EMoBDtj1zeBRZr7FENWIymyP+M7S\nWyZSLEh7qqBnPo/Fq7sKqb0YcV61elZT7ORYwFrFmqwLErYdYnr5Dg1Pg8KzNM/T\n+9k06SqQLd84F0dfMVYiphM=\n-----END PRIVATE KEY-----\n",
      client_email:
        "semicolons-viewer-1@synthetic-cargo-415216.iam.gserviceaccount.com",
      client_id: "107157680358716609706",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/semicolons-viewer-1%40synthetic-cargo-415216.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };

    socket.emit("migrate", providerData, current, target, test);
    socket.on("result", (data) => {
      console.log("data from backednd");
      console.log(data);
      socket.disconnect();
      resolve(data);
    });
  },
};
