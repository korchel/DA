import {useParams} from "react-router-dom";
import { ButtonComponent } from "../../components/ui/ButtonComponent";
import { Card } from "../../components/ui";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useGetUserQuery as getUser } from "../../store/usersApi";
import { Spinner } from "../../components/ui/icons/Spinner";
import { openModal } from "../../store/modalSlice";

export const UserDetailsPage = () => {
  const {id} = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {data: user, isLoading} = getUser(id);

  const handleDelete = () => {
    dispatch(openModal({ type: "deleteUser", open: true, id }));
  };

  const handleEdit = () => {
    dispatch(openModal({ type: "editUser", open: true, id }));
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
        <Card.Header>{t('users.detailsPage.title')}<span className="text-sky-600">{user?.username}</span></Card.Header>
        <Card.Body>
          <div><span className="font-bold">{t('users.detailsPage.name')}</span>{user?.name}</div>
          <div><span className="font-bold">{t('users.detailsPage.lastName')}</span>{user?.lastname}</div>
          <div><span className="font-bold">{t('users.detailsPage.email')}</span>{user?.email}</div>
          <div><span className="font-bold">{t('users.detailsPage.roles')}</span>{user?.roles.map((role) => role.name)}</div>
        </Card.Body>
        <Card.Footer>
          <ButtonComponent variant="primary" onClick={handleEdit}>{t('users.detailsPage.edit')}</ButtonComponent>
          <ButtonComponent variant="danger" onClick={handleDelete}>{t('users.detailsPage.delete')}</ButtonComponent>
        </Card.Footer>
      </Card>
    </div>
  );
};