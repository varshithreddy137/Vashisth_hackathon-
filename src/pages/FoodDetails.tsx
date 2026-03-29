import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  CalendarClock,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Package,
  DollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

const getScoreColor = (score: number) => {
  if (score >= 70)
    return {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
      label: "Safe",
    };
  if (score >= 40)
    return {
      bg: "bg-yellow-500/10",
      text: "text-yellow-600",
      border: "border-yellow-500/20",
      label: "Caution",
    };
  return {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    label: "Risk",
  };
};

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const foods = JSON.parse(localStorage.getItem("foods") || "[]");
    const foodItem = foods.find((f: any) => f.id === id);
    if (foodItem) setListing(foodItem);
  }, [id]);

  if (!listing)
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground">Food not found</h2>
          <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
      </div>
    );

  const now = new Date();
  const expiryDate = new Date(listing.expiry);
  const diffHours = Math.max(0, (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60));
  const safeHours = Math.round(diffHours);
  const isExpiringSoon = diffHours <= 2;
  const scoreStyle = getScoreColor(listing.safety);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <Button
          variant="outline"
          className="inline-flex items-center gap-1 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="relative overflow-hidden rounded-2xl bg-muted h-64 md:h-80">
          <img src={listing.image} alt={listing.name} className="h-full w-full object-cover" />
          {isExpiringSoon && (
            <div className="absolute right-3 top-3">
              <Badge className="gap-1 bg-destructive text-destructive-foreground border-0">
                <AlertTriangle className="h-3 w-3" />
                Expiring Soon
              </Badge>
            </div>
          )}
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">{listing.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="text-sm font-medium text-foreground">{listing.quantity}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-sm font-medium text-foreground">{listing.price}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{listing.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarClock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Expiry in Hours</p>
                  <p className="text-sm font-medium text-foreground">{safeHours}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 border-2" style={{ borderColor: `hsl(var(--primary) / 0.15)` }}>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Food Safety</h2>
            <div className="flex items-center gap-4">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold ${scoreStyle.bg} ${scoreStyle.text}`}>
                {listing.safety}
              </div>
              <div>
                <Badge variant="outline" className={`gap-1 mb-1 ${scoreStyle.bg} ${scoreStyle.text} ${scoreStyle.border}`}>
                  <ShieldCheck className="h-3.5 w-3.5" /> {scoreStyle.label} — {listing.safety}%
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Safe for approximately <span className="font-medium text-foreground">{safeHours} hours</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2 px-8 text-base" onClick={() => toast({ title: "Reserved!", description: `You've reserved "${listing.name}".` })}>
            Reserve Now
          </Button>
          <Button variant="outline" size="lg" className="gap-2 px-8 text-base" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;