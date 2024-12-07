import { MenuItem } from "@/types/restaurantType";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/useUserStore";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const { isAuthenticated  } = useUserStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAddToCart = (menu: MenuItem) => {
    if (isAuthenticated) {
      addToCart(menu);
      navigate("/cart");
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        {t("available menus")}
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((menu: MenuItem, idx: number) => (
          <Card key={idx} className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <img src={menu.image} alt="img" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                {t("price:")} <span className="text-[#D19254]">€{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {handleAddToCart(menu)}}
                // onClick={() => {
                //   addToCart(menu);
                //   navigate("/cart");
                // }}
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                {t("add to cart")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
