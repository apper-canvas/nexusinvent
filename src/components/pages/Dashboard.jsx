import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const metricCards = [
    { label: "Total Contacts", value: "—", icon: "Users", color: "from-purple-500 to-pink-500" },
    { label: "Active Deals", value: "—", icon: "TrendingUp", color: "from-blue-500 to-cyan-500" },
    { label: "Companies", value: "—", icon: "Building2", color: "from-green-500 to-teal-500" },
    { label: "Revenue", value: "—", icon: "DollarSign", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back!</h1>
        <p className="text-gray-400">Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <ApperIcon name={card.icon} size={24} className="text-white" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                Coming Soon
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{card.value}</h3>
            <p className="text-sm text-gray-400">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <ApperIcon name="Activity" size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Zap" size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Activity feed coming soon</p>
                  <p className="text-xs text-gray-500 mt-1">Stay tuned for updates</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            <ApperIcon name="Zap" size={20} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Add Contact", icon: "UserPlus" },
              { label: "Create Deal", icon: "Plus" },
              { label: "Schedule Call", icon: "Phone" },
              { label: "Send Email", icon: "Mail" }
            ].map((action, i) => (
              <button
                key={i}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
              >
                <ApperIcon 
                  name={action.icon} 
                  size={24} 
                  className="text-primary mb-2 group-hover:scale-110 transition-transform" 
                />
                <p className="text-sm text-gray-300">{action.label}</p>
                <p className="text-xs text-gray-500 mt-1">Coming soon</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;