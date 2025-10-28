import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "table") {
    return (
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded animate-pulse w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="glass-card rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded animate-pulse w-1/3" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded animate-pulse w-1/4" />
              <div className="h-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded animate-pulse w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

if (type === "enrichment") {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.2s" }} />
          <div className="absolute inset-2 w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" style={{ animationDuration: "0.8s" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
    </div>
  );
};

export default Loading;