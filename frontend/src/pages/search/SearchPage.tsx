import { useTranslation } from "react-i18next";

import { PageTitle } from "../../components/ui";

export const SearchPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle className="my-5">{t('pageDummy')}</PageTitle>
    </>
  );
};