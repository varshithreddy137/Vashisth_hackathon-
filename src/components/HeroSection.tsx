import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShareClick = () => {
    if (!user) {
      toast({ title: "Please sign up to continue", description: "Create an account to share food with your community." });
      navigate("/signup");
      return;
    }
    navigate("/add-food");
  };

  const handleSeekClick = () => {
    if (!user) {
      toast({ title: "Please sign up to continue", description: "Create an account to find food near you." });
      navigate("/signup");
      return;
    }
    const el = document.getElementById("listings");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          AI-powered food safety scoring
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          Share surplus food.{" "}
          <span className="text-primary">Feed your community.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Connect with nearby people to redistribute surplus food in real-time
          with AI-powered safety scoring.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 px-8 text-base" onClick={handleShareClick}>
            I have food to share
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2 px-8 text-base" onClick={handleSeekClick}>
            <MapPin className="h-4 w-4" />
            I need food nearby
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
