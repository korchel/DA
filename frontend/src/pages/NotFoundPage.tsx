import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../components/ButtonComponent";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full flex items-center justify-center">
      <div>{t('notFoundPage.title')}</div>
      <ButtonComponent variant="primary">{t('notFoundPage.button')}</ButtonComponent>
    </div>
  );
};