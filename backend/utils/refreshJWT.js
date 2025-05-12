import { setToken } from "../auth/tokenManager.js";
import { authorizationInstance } from "./axiosInstance.js";
import { configDotenv } from "dotenv";
configDotenv();

const payload = {
  email: process.env.CLIENT_EMAIL,
  name: process.env.CLIENT_NAME,
  rollNo: process.env.CLIENT_ROLLNO,
  accessCode: process.env.CLIENT_ACCESS_CODE,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

export const refreshToken = async () => {
  try {
    const response = await authorizationInstance.post("", payload);
    if (response.status != 200) {
      console.error(
        "[ERR]: App credentials or Client credentials are incorrect and unable to access the test server!!"
      );
      return;
    }
    const newToken = response.data.access_token;
    setToken(newToken);
  } catch (error) {
    console.error("[ERR]: Failed to refresh token:", error);
    throw error;
  }
};
