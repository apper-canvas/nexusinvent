import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Analytics</h1>
        <p className="text-gray-400">Insights and performance metrics</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-12"
      >
        <Empty
          title="Analytics Dashboard Coming Soon"
          message="Advanced analytics and reporting features are currently under development. Stay tuned!"
          icon="BarChart3"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Sales Metrics", icon: "TrendingUp" },
            { title: "Contact Growth", icon: "Users" },
            { title: "Deal Pipeline", icon: "Target" },
            { title: "Revenue Forecast", icon: "DollarSign" }
          ].map((chart, i) => (
            <div key={i} className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <ApperIcon name={chart.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-white">{chart.title}</h3>
              </div>
              <div className="h-32 rounded-lg bg-white/5 flex items-center justify-center">
                <ApperIcon name="BarChart2" size={48} className="text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;