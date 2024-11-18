import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export const showSuccessMessage = (msg, config = {}) => {
  toast.success(msg || "Success", { ...config });
};
export const showErrorMessage = (msg, config = {}) => {
  toast.error(msg || "alert", { ...config });
};

export const showPromiseNotification = (promise, msg, config = {}) => {
  console.log("promise: ", promise);
  toast.promise(promise, {
    pending: "Please wait...",
    success: {
      render({ data }) {
        console.log("data:==============> ", data);
        return data?.message;
      },
      icon: "🟢",
    },
    error: {
      render({ data }) {
        console.log("data:==============> ", data);
        return data?.message;
      },
      icon: "🟢",
    },
  });
};

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Notification;

// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'; // Import the styles

// export const showSuccessMessage = (msg, config = {}) => {
//   toast.success(msg || "Success", { ...config });
// };
// export const showErrorMessage = (msg, config = {}) => {
//   toast.error(msg || "Alert", { ...config });
// };

// export const showPromiseNotification = (promise, msg, config = {}) => {
//   toast.promise(promise, {
//     pending: "Please wait...",
//     success: {
//       render({ data }) {
//         return data?.message || "Success";
//       },
//       icon: "🟢",
//     },
//     error: {
//       render({ data }) {
//         return data?.message || "Error";
//       },
//       icon: "🔴",
//     },
//   });
// };

// const Notification = () => {
//   return (
//     <ToastContainer
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//     />
//   );
// };

// export default Notification;

