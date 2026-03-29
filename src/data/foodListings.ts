export interface FoodListing {
  id: string;
  name: string;
  distance: string;
  expiresIn: string;
  safetyScore: number;
  image: string;
  location: string;
  quantity: string;
  price: string;
  postedTime: string;
  expiryTime: string;
  safetyMessage: string;
  safetyTip: string;
  safeHours: number;
}

export const foodListings: FoodListing[] = [
  {
    id: "1",
    name: "Fresh Vegetable Box",
    distance: "0.3 km away",
    expiresIn: "2h left",
    safetyScore: 95,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    location: "12 Green Lane, Downtown",
    quantity: "1 box (~3 kg)",
    price: "Free",
    postedTime: "25 min ago",
    expiryTime: "Today, 6:00 PM",
    safetyMessage: "Fresh and properly stored at cool temperature.",
    safetyTip: "Wash vegetables before consuming.",
    safeHours: 4,
  },
  {
    id: "2",
    name: "Bakery Bread Assortment",
    distance: "0.8 km away",
    expiresIn: "4h left",
    safetyScore: 88,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    location: "45 Baker St, Midtown",
    quantity: "6 pieces",
    price: "$2.00",
    postedTime: "1 hr ago",
    expiryTime: "Today, 8:00 PM",
    safetyMessage: "Baked this morning, sealed packaging.",
    safetyTip: "Best consumed within 24 hours.",
    safeHours: 8,
  },
  {
    id: "3",
    name: "Mixed Fruit Basket",
    distance: "1.2 km away",
    expiresIn: "6h left",
    safetyScore: 92,
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
    location: "78 Orchard Ave",
    quantity: "1 basket (~2 kg)",
    price: "Free",
    postedTime: "40 min ago",
    expiryTime: "Today, 10:00 PM",
    safetyMessage: "Ripe and ready to eat, no bruising detected.",
    safetyTip: "Refrigerate if not consuming immediately.",
    safeHours: 10,
  },
  {
    id: "4",
    name: "Cooked Rice & Curry",
    distance: "0.5 km away",
    expiresIn: "1h left",
    safetyScore: 72,
    image: "https://images.unsplash.com/photo-1596097635121-14b63a7abeec?w=400&h=300&fit=crop",
    location: "5 Elm Street",
    quantity: "3 servings",
    price: "Free",
    postedTime: "2 hrs ago",
    expiryTime: "Today, 3:00 PM",
    safetyMessage: "Cooked food — consume soon for best quality.",
    safetyTip: "Reheat thoroughly before eating.",
    safeHours: 1,
  },
  {
    id: "5",
    name: "Organic Salad Mix",
    distance: "1.5 km away",
    expiresIn: "3h left",
    safetyScore: 90,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    location: "22 Vine Road",
    quantity: "2 containers",
    price: "$1.50",
    postedTime: "30 min ago",
    expiryTime: "Today, 7:00 PM",
    safetyMessage: "Pre-washed organic greens, well refrigerated.",
    safetyTip: "Keep refrigerated until ready to serve.",
    safeHours: 6,
  },
  {
    id: "6",
    name: "Pastry & Cakes",
    distance: "0.7 km away",
    expiresIn: "5h left",
    safetyScore: 85,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    location: "9 Sugar Lane",
    quantity: "4 pieces",
    price: "$3.00",
    postedTime: "1.5 hrs ago",
    expiryTime: "Today, 9:00 PM",
    safetyMessage: "Freshly made pastries, stored in display case.",
    safetyTip: "Best enjoyed at room temperature.",
    safeHours: 8,
  },
];
