import FoodCard from "./FoodCard";
import { foodListings } from "@/data/foodListings";

type Props = {
  foods?: any[];
};

const ListingsSection = ({ foods }: Props) => {
  const data = foods && foods.length > 0 ? foods : foodListings;

  return (
    <section id="listings" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Available near you
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fresh surplus food from your neighbors and local businesses
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any, index: number) => (
            <FoodCard
              key={index}
              id={(item.id ?? index).toString()}
              name={item.name}
              distance={item.distance || "Nearby"}
              expiresIn={item.expiresIn || item.expiry}
              safetyScore={item.safetyScore || item.safety}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListingsSection;