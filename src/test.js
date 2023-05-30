import React, { useEffect } from "react";
import fetchWithToken from "./tokenManager/tokenManager";

const MyComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = {
          path: "/api/data", // Replace with the actual API path
          headers: {
            username: "yuval",
           password: "123456"
        },
    };

        const data = await fetchWithToken(req);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div>Testing fetchWithToken function</div>;
};

export default MyComponent;

