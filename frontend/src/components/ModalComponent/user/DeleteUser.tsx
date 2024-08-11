import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ButtonComponent } from "../../ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";
import { routes } from "../../../routes";
import { useDeleteUserMutation } from "../../../store/usersApi";

export const DeleteUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(getCurrentDataId);
  const [deleteUser] = useDeleteUserMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteUser(id)
      .unwrap()
      .then(() => {
        toast.success(t('users.modal.delete.toast.success'));
      })
      .catch(() => {
        toast.error(t('users.modal.delete.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.usersRoute());
  };
  return (
    <>
      <div className="mb-4 font-bold">{t('users.modal.delete.areYouSure')}</div>
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