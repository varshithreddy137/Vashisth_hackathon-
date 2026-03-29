import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

const AddFood = () => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    location: "",
    expiry: "",
  });

  const [selectedLat, setSelectedLat] = useState(13.0827);
  const [selectedLng, setSelectedLng] = useState(80.2707);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateSafety = (expiry: string) => {
    const now = new Date();
    const expiryTime = new Date(expiry);

    const diffHours = (expiryTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours <= 0) return 10;
    if (diffHours < 2) return 40;
    if (diffHours < 6) return 70;
    return 95;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagePreview) {
      toast({ title: "Please upload an image" });
      return;
    }

    const safety = calculateSafety(form.expiry);

    const newFood = {
      id: crypto.randomUUID(), // Unique ID
      ...form,
      image: imagePreview,
      safety,
      lat: selectedLat,
      lng: selectedLng,
    };

    const existingFoods = JSON.parse(localStorage.getItem("foods") || "[]");
    localStorage.setItem("foods", JSON.stringify([...existingFoods, newFood]));

    toast({ title: "Food added successfully!" });

    // Reset form
    setForm({ name: "", quantity: "", price: "", location: "", expiry: "" });
    setImagePreview(null);
  };

  useEffect(() => {
    const map = L.map("map").setView([13.0827, 80.2707], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    let marker: any;

    map.on("click", function (e: any) {
      const { lat, lng } = e.latlng;

      if (marker) map.removeLayer(marker);

      marker = L.marker([lat, lng]).addTo(map);

      setSelectedLat(lat);
      setSelectedLng(lng);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          setForm((prev) => ({
            ...prev,
            location: data.display_name,
          }));
        });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-lg px-4 py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Food Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="e.g. 5 servings"
                value={form.quantity}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="Free or ₹20"
                value={form.price}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label>Pickup Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
            />
            <div id="map" style={{ height: "300px", marginTop: "10px" }}></div>
          </div>

          <div>
            <Label htmlFor="expiry">Expiry Time</Label>
            <Input
              id="expiry"
              name="expiry"
              type="datetime-local"
              value={form.expiry}
              onChange={handleChange}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Upload Food Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImagePreview(URL.createObjectURL(file));
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-3 rounded-lg h-40 object-cover"
              />
            )}
          </div>

          <Button type="submit">Add Food</Button>
        </form>

        {/* Show all added foods */}
        <div className="mt-12 space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Your Foods</h2>
          {JSON.parse(localStorage.getItem("foods") || "[]").map(
            (food: any) => (
              <div
                key={food.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-muted-foreground">{food.quantity} | {food.price}</p>
                </div>
                <Link to={`/food/${food.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFood;