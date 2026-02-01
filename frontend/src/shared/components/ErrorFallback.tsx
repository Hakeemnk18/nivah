type Props = {
  onRetry: () => void;
};

export const ErrorFallback = ({ onRetry }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181a2a] px-4">
      <div className="w-full max-w-sm bg-[#1d1e33] rounded-lg p-5 text-center">
        <h2 className="text-white text-base font-semibold">
          Something went wrong
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          This page failed to load.
        </p>

        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm rounded-md bg-[#232447] text-white hover:bg-[#2c2e4a] transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
};