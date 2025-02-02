import axios from "axios";

const BASEURL = "https://textverified.com";
const APIKEY = "8gjNR9cNZk8k2WZHNKBTFww0emeaQwm0ryQj83xTaoa6xHvNzHk6GrSseK7lZ";
const EMAIL = "he.shajjad@gmail.com";
const CACHE = {};

const isBearerTokenExpired = () => {
  let tokenCache = CACHE["token"];
  if (!tokenCache) {
    return true;
  }
  let expirationStr = tokenCache["expiresAt"];
  if (expirationStr) {
    let expiration = new Date(expirationStr);
    let currentTime = new Date();
    return currentTime >= expiration;
  }
  return true;
};

const getTokenFromCache = () => {
  let tokenCache = CACHE["token"];
  return tokenCache ? tokenCache["token"] : null;
};

const generateBearerToken = async () => {
  if (!isBearerTokenExpired()) {
    return getTokenFromCache();
  }

  try {
    const response = await axios.post(`${BASEURL}/api/pub/v2/auth`, {
      apiKey: APIKEY,
      email: EMAIL,
    });

    const newToken = response.data.token;
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    CACHE["token"] = { token: newToken, expiresAt: expiresAt.toISOString() };

    return newToken;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

export { generateBearerToken };
