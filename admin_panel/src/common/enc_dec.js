import CryptoJS from "crypto-js";

var key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_KEY);
var iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_IV);

export const encrypt = (request, isStringify = false) => {
    const request_ = isStringify ? JSON.stringify(request) : request;
    const encrypted = CryptoJS.AES.encrypt(request_, key, { iv: iv });
    return encrypted.toString();
  };

// export const decrypt = function (request) {
//     var decrypted = CryptoJS.AES.decrypt(request.toString(), key, { iv: iv });

//     return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
// }


// export const encrypt = (paramsObject) => {
//     const encryptedParams = {};
    
//     // Encrypt each key-value pair
//     Object.keys(paramsObject).forEach(key => {
//       const value = paramsObject[key];
//       const encryptedValue = CryptoJS.AES.encrypt(value.toString(), key, { iv: iv }).toString();
//       encryptedParams[key] = encryptedValue;
//     });
  
//     // Combine encrypted parameters into a string
//     const encryptedQueryString = Object.keys(encryptedParams)
//       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(encryptedParams[key])}`)
//       .join('&');
  
//     return encryptedQueryString;
//   };

export const decrypt = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
  
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };
 