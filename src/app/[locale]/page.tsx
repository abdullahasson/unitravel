// Next Inlt
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations("Hero");

  return (
    <div>
      {t("Heading")}
    </div>
  );
}
