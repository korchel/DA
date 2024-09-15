import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetDocQuery as getDoc } from "../../store/docsApi";
import { Card, ButtonComponent } from "../../components/ui";
import { openModal } from "../../store/modalSlice";
import { Spinner } from "../../components/ui/icons";
import { useAuth } from "../../context/AuthContext";
import { defineAbilityFor } from "../../casl/ability";
import { Can } from "@casl/react";

export const DocumentDetailsPage = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data: doc, isLoading } = getDoc(id);

  const ability = defineAbilityFor({
    user: { ...currentUser, isAuthenticated },
    entity: { authorId: doc?.author.idUser },
  });

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
      <Card.Header>
        {t('documents.detailsPage.title') + ' '}
        <span className="text-highlight">
          {doc?.title}
        </span>
      </Card.Header>
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
        <Can I="edit" a="document" ability={ability}>
          <ButtonComponent variant="primary" onClick={handleEdit}>{t('documents.detailsPage.edit')}</ButtonComponent>
        </Can>
        <Can I="delete" a="document" ability={ability}>
          <ButtonComponent variant="danger" onClick={handleDelete}>{t('documents.detailsPage.delete')}</ButtonComponent>
        </Can>
      </Card.Footer>
    </Card>
  );
};