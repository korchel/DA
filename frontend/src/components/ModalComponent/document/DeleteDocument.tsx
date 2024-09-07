import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ButtonComponent } from "../../ui";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { useDeleteDocMutation } from "../../../store/docsApi";
import { routes } from "../../../routes";

export const DeleteDocument = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(getCurrentDataId);

  const [deleteDoc] = useDeleteDocMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteDoc(id)
      .unwrap()
      .then(() => {
        toast.success(t('documents.modal.delete.toast.success'));
      })
      .catch(() => {
        toast.error(t('documents.modal.delete.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.documentsRoute());
  };

  return (
    <>
      <div className="mb-4 font-bold">{t('documents.modal.delete.areYouSure')}</div>
      <div className="flex justify-between gap-4">
        <ButtonComponent
          variant="outline"
          onClick={handleClose}
        >
          {t('cancel')}
        </ButtonComponent>
        <ButtonComponent
          variant="danger"
          onClick={handleDelete}
        >
          {t('delete')}
        </ButtonComponent>
      </div>
    </>
  );
};