import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  label, 
  error, 
  className,
  containerClassName,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg",
          "bg-white/5 backdrop-blur-sm",
          "border border-white/10",
          "text-white placeholder-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
          "transition-all duration-200 resize-none",
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;