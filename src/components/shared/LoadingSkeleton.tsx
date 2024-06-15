import LoaderImage from "@/assets/fast-loading.svg";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Typography } from "../ui/typography";

const LoadingSkeleton = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full h-full">
      <img
        src={LoaderImage}
        alt="loading"
        className="w-full h-36 aspect-video"
      />
      <div className="flex items-center justify-center w-full -mt-20">
        <Loader className="mr-2 animate-spin" />
        <Typography size="lg" className="italic font-normal lowercase">
          {t("common.loading", "Loading...")}
        </Typography>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
