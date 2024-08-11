import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ButtonComponent } from "../../ButtonComponent";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { routes } from "../../../routes";
import { useDeleteFileMutation } from "../../../store/filesApi";

export const DeleteFile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(getCurrentDataId);
  const [deleteFile] = useDeleteFileMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteFile(id)
      .unwrap()
      .then(() => {
        toast.success(t('files.modal.delete.toast.success'));
      })
      .catch(() => {
        toast.error(t('files.modal.delete.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.filesRoute());
  };
  return (
    <>
      <div className="mb-4 font-bold">{t('files.modal.delete.areYouSure')}</div>
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
  )
};