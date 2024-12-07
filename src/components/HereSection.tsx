import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HereImage from "@/assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HereSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [suggestions] = useState<string[]>([
    "Pizza",
    "Burger",
    "Sushi",
  ]);
  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
    navigate(`/search/${suggestion}`); 
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            {t("Order Food anytime & anywhere")}
          </h1>
          <p className="text-gray-500">
            {t("Hey! Our Delicios food is waiting for you, we are always near to you.")}
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            placeholder={t("Search restaurant by name, city & country")}
            onChange={(e) => setSearchText(e.target.value)}
            className={`${isArabic ? "pr-10" : "pl-10"} shadow-lg`}
          />
          <Search className={`text-gray-500 absolute inset-y-2 ${isArabic ? "right-2 left-auto" : "left-2"}`} />
          <Button onClick={() => navigate(`/search/${searchText}`)} className="bg-orange hover:bg-hoverOrange">{t("Search")}</Button>
        </div>
        {searchText === "" && (
          <div className="mt-4 flex gap-x-4">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-orange hover:bg-hoverOrange px-4 py-2"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div>
        <img
          src={HereImage}
          alt="img"
          className="object-cover w-full max-h-[500px]"
        />
      </div>
    </div>
  );
};

export default HereSection;

// import { useState } from "react";
// import { Input } from "./ui/input";
// import { Search } from "lucide-react";
// import { Button } from "./ui/button";
// import HereImage from "@/assets/hero_pizza.png";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const HereSection = () => {
//   const [searchText, setSearchText] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<string[]>([
//     "Pizza",
//     "Burger",
//     "Sushi",
//     "Pasta",
//     "Salads",
//   ]); // Example suggestions, you can customize this list
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   const isArabic = i18n.language === "ar";

//   const handleSuggestionClick = (suggestion: string) => {
//     setSearchText(suggestion); // Set search text to the suggestion
//     navigate(`/search/${suggestion}`); // Trigger search with the suggestion
//   };

//   return (
//     <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
//       <div className="flex flex-col gap-10 md:w-[40%]">
//         <div className="flex flex-col gap-5">
//           <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
//             {t("Order Food anytime & anywhere")}
//           </h1>
//           <p className="text-gray-500">
//             {t("Hey! Our Delicios food is waiting for you, we are always near to you.")}
//           </p>
//         </div>
//         <div className="relative flex items-center gap-2">
//           <Input
//             type="text"
//             value={searchText}
//             placeholder={t("Search restaurant by name, city & country")}
//             onChange={(e) => setSearchText(e.target.value)}
//             className={`${isArabic ? "pr-10" : "pl-10"} shadow-lg`}
//           />
//           <Search className={`text-gray-500 absolute inset-y-2 ${isArabic ? "right-2 left-auto" : "left-2"}`} />
//           <Button onClick={() => navigate(`/search/${searchText}`)} className="bg-orange hover:bg-hoverOrange">{t("Search")}</Button>
//         </div>
//         {/* Suggestions section in a row */}
//         {searchText === "" && (
//           <div className="mt-4 flex gap-x-4">
//             {suggestions.map((suggestion, index) => (
//               <Button
//                 key={index}
//                 onClick={() => handleSuggestionClick(suggestion)}
//                 className="bg-orange hover:bg-hoverOrange px-4 py-2"
//               >
//                 {suggestion}
//               </Button>
//             ))}
//           </div>
//         )}
//       </div>
//       <div>
//         <img
//           src={HereImage}
//           alt="img"
//           className="object-cover w-full max-h-[500px]"
//         />
//       </div>
//     </div>
//   );
// };

// export default HereSection;
