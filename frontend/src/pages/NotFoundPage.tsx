import { useTranslation } from "react-i18next";
import { ButtonComponent, PageTitle } from "../components/ui";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <PageTitle>{t('notFoundPage.title')}</PageTitle>
      <ButtonComponent variant="primary">{t('notFoundPage.button')}</ButtonComponent>
    </div>
  );
};