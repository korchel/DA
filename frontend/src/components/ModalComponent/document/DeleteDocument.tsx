import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
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
  const [deleteDoc, { isError }] = useDeleteDocMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteDoc(id);
    if (isError) {
      toast.error(t('modal.deleteDocument.toast.error'));
    } else {
      toast.success(t('modal.deleteDocument.toast.success'));
    }
    dispatch(closeModal());
    navigate(routes.documentsRoute());
  };

  return (
    <>
      <div className="mb-4 font-bold">{t('modal.deleteDocument.areYouSure')}</div>
      <div className="flex justify-between gap-4">
        <ButtonComponent
          variant="outline"
          onClick={handleClose}
        >
          {t('modal.cancel')}
        </ButtonComponent>
        <ButtonComponent
          variant="danger"
          onClick={handleDelete}
        >
          {t('modal.delete')}
        </ButtonComponent>
      </div>
    </>
  );
};