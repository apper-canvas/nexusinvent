import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
    >
      <div className="glass-card rounded-2xl p-8 max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-red-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">Oops!</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;