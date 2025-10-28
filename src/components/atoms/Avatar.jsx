import { cn } from "@/utils/cn";

const generateGradient = (name) => {
  const colors = [
    ["from-purple-500", "to-pink-500"],
    ["from-blue-500", "to-cyan-500"],
    ["from-green-500", "to-teal-500"],
    ["from-orange-500", "to-red-500"],
    ["from-indigo-500", "to-purple-500"],
    ["from-pink-500", "to-rose-500"],
  ];
  
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const Avatar = ({ firstName, lastName, size = "md", className }) => {
  const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`;
  const [from, to] = generateGradient(fullName);
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl"
  };
  
  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br",
      from,
      to,
      sizeClasses[size],
      className
    )}>
      {initials}
    </div>
  );
};

export default Avatar;