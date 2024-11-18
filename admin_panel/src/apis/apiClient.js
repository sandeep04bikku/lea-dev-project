import axios from "axios";
import CryptoJS from "crypto-js";
import { getToken } from "../common/LocalStorageService";
import { logOutRedirectCall } from "../common/RedirectPathManage";
import { showErrorMessage } from "../common/notification";

var key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_KEY);
var iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_IV);

// console.log(process.env.REACT_APP_APP_NAME);
// console.log(CryptoJS.AES.encrypt(JSON.stringify(process.env.REACT_APP_APP_NAME), key, { iv: iv }).toString());

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  // baseURL:
  //   "https://3f80-49-36-69-241.ngrok-free.app/" ||
  //   process.env.REACT_APP_API_END_POINT,
  headers: {
    // "api-key": process.env.REACT_APP_API_ENC_KEY,
    "api-key":bodyEncryption(process.env.REACT_APP_APP_NAME),
    "Accept-Language": "en",
    "Content-Type": "text/plain",
    type: "admin",
  },
});

// Body Encryption Request
axiosClient.interceptors.request.use(function (request) {
  console.log(request.url, "==>", request.data);
  request.data = bodyEncryption(request.data, true);
  const token = getToken();
  // console.log('token: ', token)
  if (token) {
    console.log("token: ++++", token);
    request.headers["token"] = bodyEncryption(token);
  }
  return request;
});

axiosClient.interceptors.response.use(
  function (response) {
    // console.log(response,"abc");
    response = bodyDecryption(response.data);

    // if (response.code === 400) {
    //   showErrorMessage(response.data.message);
    // }
    console.log("response: axiosss ", response);

    return response;
  },

  function (error) {
    console.log("error1: ===>", error);
    let res = error.response;
    if (!error.response) {
      console.log("error: ", error);
      return Promise.reject(error);
    }

    if (res.status === 401) {
      logOutRedirectCall();
      const response = bodyDecryption(res.data);
      return response;
    } else if (
      res.status === 400 ||
      res.status === 409 ||
      res.status === 500 ||
      res.status === 404
    ) {
      const response = bodyDecryption(res.data);
      return response;
    } else {
      console.error(
        "Looks like there was a problem. Status Code: " + res.status
      );
      return Promise.reject(error);
    }
  }
);

function bodyEncryption(request, isStringify) {
  var request_ = isStringify ? JSON.stringify(request) : request;
  var encrypted = CryptoJS.AES.encrypt(request_, key, { iv: iv });
  return encrypted.toString();
}

function bodyDecryption(request) {
  var decrypted = CryptoJS.AES.decrypt(request.toString(), key, { iv: iv });

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

export { axiosClient };
