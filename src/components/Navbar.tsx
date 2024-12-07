import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";
import logo from '../assets/Foodora-logo.png';
import logoDark from '../assets/Foodora-2-removebg.png';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



const Navbar = () => {
  const { isAuthenticated, user, logout } = useUserStore();
  const { cart } = useCartStore();
  const { theme, setTheme } = useThemeStore();
  type LanguageKey = keyof typeof languages;  
  const [language, setLanguage] = useState<LanguageKey>("de");
  const { t, i18n } = useTranslation();

  const languages = {
    en: `${t("english")}`,
    ar: `${t("arabic")}`,
    de: `${t("german")}`,
  };

  const changeLanguage = (lang: any) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
  }, [language]);

  return (
    <div className="max-w-7xl pt-5 mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          {/* <h1 className="font-bold md:font-extrabold text-2xl">Foodora</h1> */}
          <img className="w-1/2" src={theme === 'dark' ? logoDark : logo} alt="logo" />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">{t("home")}</Link>
            {
              isAuthenticated ? (
                <>
                  <Link to="/profile">{t("profile")}</Link>
                  <Link to="/order/status">{t("order")}</Link>
                </>
              ) : null
            }


            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>{t("dashboard")}</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>{t("restaurant")}</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>{t("menu")}</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>{t("orders")}</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
            <div className="flex items-center gap-4">
              <div className="flex gap-2 relative">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      {languages[language]} 
                    </MenubarTrigger>
                    <MenubarContent>
                      {Object.entries(languages).map(([key, value]) => (
                        <MenubarItem key={key} onClick={() => changeLanguage(key)}>
                          {value}
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t("toggle theme")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>{t("light")}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>{t("dark")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                >
                  {cart.length}
                </Button>
              )}
            </Link>
            <div>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                {/* <AvatarFallback>CN</AvatarFallback> */}
              </Avatar>
            </div>
            <div>
              {isAuthenticated ? (
                <Button onClick={logout} className="bg-orange hover:bg-hoverOrange">
                  {t("logout")}
                </Button>
              ) : (
                <Link
                  to="/login"
                >
                  <Button
                    className="bg-orange hover:bg-hoverOrange"
                  >
                    {t("Login")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive  */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout , isAuthenticated } = useUserStore();
  const { theme, setTheme } = useThemeStore();
  const { t, i18n } = useTranslation();
  type LanguageKey = keyof typeof languages;
  const [language, setLanguage] = useState<LanguageKey>("de");

  const languages = {
    en: `${t("english")}`,
    ar: `${t("arabic")}`,
    de: `${t("german")}`,
  };

  const changeLanguage = (lang: any) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
  }, [language]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <img className="w-1/2" src={theme === 'dark' ? logoDark : logo} alt="logo" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">{t("toggle theme")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>{t("light")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>{t("dark")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <div className="flex my-2 gap-2 relative">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>{languages[language]}</MenubarTrigger>
                <MenubarContent>
                  {Object.entries(languages).map(([key, value]) => (
                    <MenubarItem key={key} onClick={() => changeLanguage(key)}>
                      {value}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>{t("profile")}</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>{t("order")}</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>{t("cart")} (0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>{t("menu")}</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>{t("restaurant")}</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>{t("restaurant orders")}</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              {/* <AvatarFallback>CN</AvatarFallback> */}
            </Avatar>
            <h1 className="font-bold"><a className="border-b border-b-orange hover:text-orange" href="https://dev-mahmoud.vercel.app">{t("mahmoud mohamed")}</a></h1>
          </div>
          <SheetClose asChild>
            {isAuthenticated ? (
              <Button onClick={logout} className="bg-orange hover:bg-hoverOrange">
                {t("logout")}
              </Button>
            ) : (
              <Link
                to="/login"
              >
                <Button
                  className="bg-orange hover:bg-hoverOrange"
                >
                  {t("Login")}
                </Button>
              </Link>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
