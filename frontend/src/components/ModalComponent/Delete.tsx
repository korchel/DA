import { useTranslation } from "react-i18next";
import { ButtonComponent } from "../ButtonComponent";
import { closeModal, getCurrentDataId } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteDocMutation } from "../../store/docsApi";

export const Delete = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const handleClose = () => {
    dispatch(closeModal());
  };
  const [deleteDoc] = useDeleteDocMutation();

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
          onClick={() => deleteDoc(id)}
        >
          {t('modal.delete.delete')}
        </ButtonComponent>
      </div>
    </>
  );
};