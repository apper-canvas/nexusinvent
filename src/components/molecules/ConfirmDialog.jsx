import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", variant = "danger" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  variant === "danger" ? "bg-red-500/20" : "bg-primary/20"
                )}>
                  <ApperIcon 
                    name={variant === "danger" ? "AlertTriangle" : "AlertCircle"} 
                    size={24} 
                    className={variant === "danger" ? "text-red-400" : "text-primary"}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                  <p className="text-gray-400">{message}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <Button variant="ghost" onClick={onClose}>
                  {cancelText}
                </Button>
                <Button variant={variant} onClick={onConfirm}>
                  {confirmText}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default ConfirmDialog;