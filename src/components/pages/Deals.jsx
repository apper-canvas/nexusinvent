import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Deals = () => {
  const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Deals</h1>
        <p className="text-gray-400">Track your sales pipeline</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8"
      >
        <div className="text-center mb-12">
          <Empty
            title="Pipeline Coming Soon"
            message="Deal tracking and pipeline management features are currently under development."
            icon="TrendingUp"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage, i) => (
            <div key={i} className="glass-card rounded-xl p-4 border-2 border-dashed border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{stage}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">0</span>
              </div>
              <div className="space-y-2 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="Package" size={32} className="text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No deals yet</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Deals;