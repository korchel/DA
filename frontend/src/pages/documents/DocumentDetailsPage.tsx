import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetDocQuery as getDoc } from "../../store/docsApi";
import { Card, ButtonComponent } from "../../components/ui";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../components/ui/icons";

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
      <Spinner className="h-[100%]" />
    );
  }

  return (
    <Card>
      <Card.Header>{t('documents.detailsPage.title')}<span className="text-sky-600">{doc?.title}</span></Card.Header>
      <Card.Body>
        <div><span className="font-bold">{t('documents.detailsPage.number')}</span>{doc?.number}</div>
        <div><span className="font-bold">{t('documents.detailsPage.author')}</span>{doc?.author.username}</div>
        <div><span className="font-bold">{t('documents.detailsPage.type')}</span>{doc?.type.type}</div>
        <div className="font-bold">{t('documents.detailsPage.content')}</div>
        <div>{doc?.content}</div>
        <div><span className="font-bold">{t('documents.detailsPage.creationDate')}</span>{doc?.creationDate}</div>
        <div><span className="font-bold">{t('documents.detailsPage.updateDate')}</span>{doc?.updateDate}</div>
      </Card.Body>
      <Card.Footer>
        <ButtonComponent variant="primary" onClick={handleEdit}>{t('documents.detailsPage.edit')}</ButtonComponent>
        <ButtonComponent variant="danger" onClick={handleDelete}>{t('documents.detailsPage.delete')}</ButtonComponent>
      </Card.Footer>
    </Card>
  );
};