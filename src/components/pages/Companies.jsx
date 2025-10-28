import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Companies = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Companies</h1>
        <p className="text-gray-400">Manage your business relationships</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-12"
      >
        <Empty
          title="Companies Coming Soon"
          message="Company management features are currently under development. Stay tuned for updates!"
          icon="Building2"
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Company Profiles", icon: "Building2", desc: "Detailed company information" },
            { title: "Contact Linking", icon: "Link", desc: "Associate contacts with companies" },
            { title: "Company Insights", icon: "TrendingUp", desc: "Track company metrics" }
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white/5">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <ApperIcon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Companies;