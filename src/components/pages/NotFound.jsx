import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <ApperIcon name="Home" size={48} className="text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold gradient-text">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium hover:shadow-glow transition-all duration-300"
        >
          <ApperIcon name="ArrowLeft" size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;