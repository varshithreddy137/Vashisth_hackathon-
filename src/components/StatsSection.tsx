import { Utensils, Users, Leaf, Building2 } from "lucide-react";

const stats = [
  { icon: Utensils, value: "12,400+", label: "Meals Saved", color: "text-primary" },
  { icon: Users, value: "3,200+", label: "Active Users", color: "text-primary" },
  { icon: Leaf, value: "8.2 tons", label: "CO₂ Offset", color: "text-primary" },
  { icon: Building2, value: "45", label: "NGOs Connected", color: "text-primary" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl mb-12">
          Our Impact So Far
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl bg-card p-6 shadow-sm"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mb-3`} />
              <span className="text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
