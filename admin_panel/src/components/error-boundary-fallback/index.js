//__TODO__: style the error component based on the design
export default function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="error-boundary-fallback p-4 bg-secondary-50 h-full w-full text-sm"
    >
      <div className="text-xl font-bold">
        Technical Error:{" "}
        <button
          color="primary"
          variant="link"
          onClick={resetErrorBoundary}
          className="px-2"
        >
          Try again
        </button>
      </div>
      <pre className="text-red-500 bg-red-50 p-4">{error.message}</pre>
      <div className="my-2">
        Please try again later or check with{" "}
        <span className="uppercase text-primary-text font-bold">NAVGATH</span>{" "}
        Support Team.{" "}
      </div>
    </div>
  );
}
