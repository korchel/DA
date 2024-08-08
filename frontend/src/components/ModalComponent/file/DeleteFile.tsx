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
  const [deleteFile, { isError }] = useDeleteFileMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteFile(id);
    if (isError) {
      toast.error(t('modal.deleteFile.toast.error'));
    } else {
      toast.success(t('modal.deleteFile.toast.success'));
    }
    dispatch(closeModal());
    navigate(routes.filesRoute());
  };
  return (
    <>
      <div className="mb-4 font-bold">{t('modal.deleteFile.areYouSure')}</div>
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