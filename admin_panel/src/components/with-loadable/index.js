import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

import _ErrorBoundaryFallback from "../error-boundary-fallback";

export default function withLoadable(lazyImport, config = {}) {
  const { suspenseFallback = null, ErrorBoundaryFallback = _ErrorBoundaryFallback } = config;

  const Component = lazy(lazyImport);
  const suspenseProps = {};

  if (suspenseFallback) {
    suspenseProps.fallback = suspenseFallback;
  }

  return function Loadable(props) {
    return (
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Suspense {...suspenseProps}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}
