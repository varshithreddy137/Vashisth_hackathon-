import { Camera, ShieldCheck, Truck } from "lucide-react";

const steps = [
  { icon: Camera, title: "List Your Food", description: "Snap a photo, add details, and our AI evaluates safety in seconds." },
  { icon: ShieldCheck, title: "AI Safety Check", description: "Our model scores food quality so recipients can make informed decisions." },
  { icon: Truck, title: "Connect & Share", description: "Nearby users reserve the food and pick it up—reducing waste together." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl mb-12">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="mb-1 text-xs font-semibold text-primary uppercase tracking-wider">
                Step {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
