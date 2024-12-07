import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const loading =  false;
    const {t} = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">{t("Reset Password")}</h1>
          <p className="text-sm text-gray-600">{t("Enter your new password to reset old one")}</p>
        </div>
        <div className="relative w-full">
            <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t("Enter your new password")}
            className="pl-10"
            />
            <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {
            loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> {t("please wait")}</Button>
            ) : (
                <Button className="bg-orange hover:bg-hoverOrange">{t("Reset Password")}</Button>
            )
        }
        <span className="text-center">
            {t("Back to")}{" "}
            <Link to="/login" className="text-blue-500">{t("Login")}</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
