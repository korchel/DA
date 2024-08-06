import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../../ButtonComponent";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteDocMutation } from "../../../store/docsApi";
import { useNavigate } from "react-router-dom";
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
    deleteDoc(id);
    dispatch(closeModal());
    navigate(routes.documentsRoute());
  };

  return (
    <>
      <div className="mb-4 font-bold">{t('modal.delete.areYouSure')}</div>
      <div className="flex justify-between gap-4">
        <ButtonComponent
          variant="outline"
          onClick={handleClose}
        >
          {t('modal.delete.cancel')}
        </ButtonComponent>
        <ButtonComponent
          variant="danger"
          onClick={handleDelete}
        >
          {t('modal.delete.delete')}
        </ButtonComponent>
      </div>
    </>
  );
};