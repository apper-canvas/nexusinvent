import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title = "No data found", message = "Get started by adding your first item", actionLabel, onAction, icon = "Inbox" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
    >
      <div className="glass-card rounded-2xl p-8 max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <ApperIcon name={icon} size={40} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2 gradient-text">{title}</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={20} />
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;