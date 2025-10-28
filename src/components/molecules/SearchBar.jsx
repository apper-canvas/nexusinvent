import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ value, onChange, placeholder = "Search...", className }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn(
      "relative glass-card rounded-xl transition-all duration-200",
      isFocused && "ring-2 ring-primary/50",
      className
    )}>
      <ApperIcon 
        name="Search" 
        size={20} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <ApperIcon name="X" size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;