import axios from "axios";

// const BASEURL = import.meta.env.BASEURL;
// const APIKEY = import.meta.env.APIKEY;
// const EMAIL = import.meta.env.EMAIL;
const CACHE = {};

const BASEURL = "https://textverified.com";
const APIKEY = "8gjNR9cNZk8k2WZHNKBTFww0emeaQwm0ryQj83xTaoa6xHvNzHk6GrSseK7lZ";
const EMAIL = "he.shajjad@gmail.com";

console.log(BASEURL);
console.log(APIKEY);
console.log(EMAIL);

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

const storeTokenInCache = (token, expiration) => {
  CACHE["token"] = { token, expiresAt: expiration };
};

const generateBearerToken = async () => {
  if (!isBearerTokenExpired()) {
    return getTokenFromCache();
  }

  try {
    const response = await axios.post(`${BASEURL}/api/pub/v2/auth`, {
      APIKEY,
      EMAIL,
    });

    const newToken = response.data;
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // Token expires in 1 hour
    storeTokenInCache(newToken, expiresAt.toISOString());

    console.log(newToken);

    return newToken;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

// const getAccountDetails = async (bearerToken) => {
//   try {
//     const response = await fetch(`${BASEURL}/api/pub/v2/account/me`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${bearerToken}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error, status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//     console.log(`\nCurrent balance: ${data["currentBalance"]}`);
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

export { generateBearerToken };
