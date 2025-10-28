import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const navItems = [
  { path: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/contacts", label: "Contacts", icon: "Users" },
  { path: "/companies", label: "Companies", icon: "Building2" },
  { path: "/deals", label: "Deals", icon: "TrendingUp" },
  { path: "/analytics", label: "Analytics", icon: "BarChart3" }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-64 glass-card border-r border-white/10 z-50 flex flex-col"
      >
        <SidebarContent onItemClick={onClose} />
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 glass-card border-r border-white/10 flex-col">
        <SidebarContent />
      </aside>
    </>
  );
};

const SidebarContent = ({ onItemClick }) => {
  return (
    <>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <ApperIcon name="Zap" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Nexus CRM</h1>
            <p className="text-xs text-gray-400">Manage relationships</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
              isActive 
                ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-white" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full" />
                )}
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;