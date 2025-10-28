import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const buttonVariants = {
  primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:shadow-glow hover:scale-105",
  secondary: "bg-transparent border border-primary/30 text-white hover:border-primary/60 hover:bg-primary/10",
  danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105",
  ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
};

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  disabled,
  ...props 
}, ref) => {
  const Component = motion.button;
  
  return (
    <Component
      ref={ref}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = "Button";

export default Button;