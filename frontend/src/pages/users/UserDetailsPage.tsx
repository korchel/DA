import {useParams} from "react-router-dom";
import { ButtonComponent } from "../../components/ButtonComponent";
import { Card } from "../../components/ui";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useGetUserQuery as getUser } from "../../store/usersApi";
import { Spinner } from "../../icons/Spinner";

// const user = {
//   id: 1,
//   username: 'username1',
//   email: 'email1',
//   name: 'name1',
//   lastName: 'lastname1',
//   roles: ['ROLE_ADMIN'],
// };

export const UserDetailsPage = () => {
  const {id} = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {data: user, isLoading} = getUser(id);

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
        <Card.Header>{t('userDetailsPage.title')}<span className="text-sky-600">{user.username}</span></Card.Header>
        <Card.Body>
          <div><span className="font-bold">{t('userDetailsPage.name')}</span>{user.name}</div>
          <div><span className="font-bold">{t('userDetailsPage.lastName')}</span>{user.lastName}</div>
          <div><span className="font-bold">{t('userDetailsPage.email')}</span>{user.email}</div>
          <div><span className="font-bold">{t('userDetailsPage.roles')}</span>{user.roles}</div>
        </Card.Body>
        <Card.Footer>
          <ButtonComponent variant="primary">{t('userDetailsPage.edit')}</ButtonComponent>
          <ButtonComponent variant="danger">{t('userDetailsPage.delete')}</ButtonComponent>
        </Card.Footer>
      </Card>
    </div>
  );
};