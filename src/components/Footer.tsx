import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-secondary/30 py-10">
    <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">FoodBridge</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 FoodBridge. Reducing food waste, one meal at a time.
      </p>
    </div>
  </footer>
);

export default Footer;
