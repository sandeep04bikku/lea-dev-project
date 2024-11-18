import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./components/error-boundary-fallback";

import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <BrowserRouter basename="/lea-training/admin/">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
  // </StrictMode>
);
