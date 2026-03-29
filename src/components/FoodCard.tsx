import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface FoodCardProps {
  id: string;
  name: string;
  distance: string;
  expiresIn: string;
  safetyScore: number;
  image: string;
}

const FoodCard = ({ id, name, distance, expiresIn, safetyScore, image }: FoodCardProps) => {
  const isHighSafety = safetyScore >= 80;

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl bg-card border transition-shadow hover:shadow-md"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="gap-1 bg-card/90 backdrop-blur-sm text-foreground border-0">
            <Clock className="h-3 w-3" />
            {expiresIn}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {distance}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Badge
            className={`gap-1 ${
              isHighSafety
                ? "bg-primary/10 text-primary hover:bg-primary/15 border-primary/20"
                : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/15 border-yellow-500/20"
            }`}
            variant="outline"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Safety: {safetyScore}%
          </Badge>
        </div>

        <div className="mt-4 flex gap-2 pt-1">
          <Button size="sm" variant="default" className="h-8 flex-1 text-xs">
            Reserve
          </Button>
          <Button size="sm" variant="outline" className="h-8 flex-1 text-xs" asChild>
            <Link to={`/food/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
