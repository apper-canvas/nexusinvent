import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden glass-card border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            <ApperIcon name="Menu" size={24} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <ApperIcon name="Zap" size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold gradient-text">Nexus CRM</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;