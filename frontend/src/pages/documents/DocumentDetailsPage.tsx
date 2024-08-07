import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetDocQuery as getDoc } from "../../store/docsApi";
import { Card } from "../../components/ui";
import { ButtonComponent } from "../../components/ButtonComponent";
import { openModal } from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "../../icons/Spinner";

export const DocumentDetailsPage = () => {
  const {id} = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: doc, isLoading } = getDoc(id);

  const handleDelete = () => {
    dispatch(openModal({ type: "deleteDocument", open: true, id }));
  };

  const handleEdit = () => {
    dispatch(openModal({ type: "editDocument", open: true, id }));
  };

  if (isLoading) {
    return (
      <div className="h-full p-8 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full p-8 flex flex-col items-center ">
      <Card>
        <Card.Header>{t('documentDetailsPage.title')}<span className="text-sky-600">{doc?.title}</span></Card.Header>
        <Card.Body>
          <div><span className="font-bold">{t('documentDetailsPage.number')}</span>{doc?.number}</div>
          <div><span className="font-bold">{t('documentDetailsPage.author')}</span>{doc?.author.username}</div>
          <div><span className="font-bold">{t('documentDetailsPage.type')}</span>{doc?.type.type}</div>
          <div className="font-bold">{t('documentDetailsPage.content')}</div>
          <div>{doc?.content}</div>
          <div><span className="font-bold">{t('documentDetailsPage.creationDate')}</span>{doc?.creationDate}</div>
          <div><span className="font-bold">{t('documentDetailsPage.updateDate')}</span>{doc?.updateDate}</div>
        </Card.Body>
        <Card.Footer>
          <ButtonComponent variant="primary" onClick={handleEdit}>{t('documentDetailsPage.edit')}</ButtonComponent>
          <ButtonComponent variant="danger" onClick={handleDelete}>{t('documentDetailsPage.delete')}</ButtonComponent>
        </Card.Footer>
      </Card>
    </div>
  );
};