import { AlertCircle, RefreshCcw } from "lucide-react";

type Props = {
  title: string;
  onRetry?: () => void;
};

const WidgetErrorFallback = ({ title, onRetry }: Props) => {
  return (
    <div className="h-full w-full rounded-2xl p-6 flex flex-col items-center justify-center text-center
                    bg-[#1f223f] border border-red-500/20 shadow-md min-h-[250px]">
      <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
      <h3 className="text-sm font-semibold text-gray-200">{title} Failed</h3>
      <p className="text-xs text-gray-400 mt-1 mb-4 max-w-[200px]">
        We couldn't load this data. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 text-xs font-medium text-white bg-white/5 hover:bg-white/10 
                   border border-white/10 rounded-lg flex items-center gap-2 transition-all"
      >
        <RefreshCcw className="w-3 h-3" />
        Retry
      </button>
    </div>
  );
};

export default WidgetErrorFallback;