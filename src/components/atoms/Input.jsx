import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  label, 
  error, 
  className,
  containerClassName,
  isEnrichable = false,
  ...props 
}, ref) => {
  const isEmpty = !props.value || props.value.toString().trim() === '';
  const showEnrichablePlaceholder = isEnrichable && isEmpty && !props.placeholder;
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
className={cn(
          "w-full px-4 py-2.5 rounded-lg",
          "bg-white/5 backdrop-blur-sm",
          "text-white placeholder-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
          "transition-all duration-200",
          error && "border-red-500/50 focus:ring-red-500/50",
          isEnrichable && isEmpty 
            ? "border-dashed border-gray-400/40" 
: "border border-white/10",
          className
        )}
        placeholder={showEnrichablePlaceholder ? "Click Enrich to auto-populate" : props.placeholder}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;