import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-center text-gray-300 py-8 px-4">
      <p className="text-sm">
          &copy; {t("2024 Foodora. All rights reserved. By")} <a className="border-b border-b-orange hover:text-orange" href="https://dev-mahmoud.vercel.app">{t("mahmoud mohamed")}</a>
        </p> 
    </footer>
  );
};

export default Footer;