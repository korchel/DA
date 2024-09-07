import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../components/ui";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <div className="text-2xl font-bold">{t('notFoundPage.title')}</div>
      <ButtonComponent variant="primary">{t('notFoundPage.button')}</ButtonComponent>
    </div>
  );
};