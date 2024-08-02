import {useParams} from "react-router-dom";
import { ButtonComponent } from "../components/ButtonComponent";

const user = {
  id: 1,
  username: 'username1',
  email: 'email1',
  name: 'name1',
  lastName: 'lastname1',
  roles: ['ROLE_ADMIN'],
};

export const UserDetailsPage = () => {
  const {id} = useParams();

  return (
    <div className="">
      <h1>Информация о пользователе</h1>
      <div>Имя пользователя: {user.username}</div>
      <div>Имя: {user.name}</div>
      <div>e-mail:</div>
      <div>Роли:</div>
      <div>
        <ButtonComponent variant="primary">Редактировать данные</ButtonComponent>
        <ButtonComponent variant="danger">Удалить пользователя</ButtonComponent>
      </div>

    </div>
  );
};