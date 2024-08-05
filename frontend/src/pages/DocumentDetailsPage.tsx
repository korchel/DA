import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetDocQuery as getDoc } from "../store/docsApi";

export const DocumentDetailsPage = () => {
  const {id} = useParams();
  const { t } = useTranslation();
  const { data: doc } = getDoc(id);
  console.log(doc);
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