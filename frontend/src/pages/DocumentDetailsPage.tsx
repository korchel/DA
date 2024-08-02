import { useTranslation } from "react-i18next";
import {useParams} from "react-router-dom";

export const DocumentDetailsPage = () => {
  const {id} = useParams();
  const { t } = useTranslation();

  return (
    <div>
      <h1>Информация о документе</h1>
      <div>{id}</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};