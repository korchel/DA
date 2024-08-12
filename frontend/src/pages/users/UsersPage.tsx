import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/interfaces";
import { routes } from "../../routes";
import { useTranslation } from "react-i18next";
import { useGetUsersQuery as getUsers} from "../../store/usersApi";
import { Spinner } from "../../components/ui/icons/Spinner";

export const UsersPage = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = getUsers();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-full p-8 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="h-full p-8">
      <table className="w-[100%] bg-white text-left rounded-md shadow-md">
        <thead className="uppercase text-sky-600 whitespace-nowrap">
          <tr className="border-b">
            <th className="py-4 px-5">{t('users.tableHeader.userName')}</th>
            <th className="py-4 px-5">{t('users.tableHeader.name')}</th>
            <th className="py-4 px-5">{t('users.tableHeader.lastName')}</th>
            <th className="py-4 px-5">{t('users.tableHeader.roles')}</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr className="table-row border-b overflow-hidden hover:bg-sky-50 cursor-pointer" key={user.id} onClick={() => navigate(routes.userDetailsRoute(user.id))}>
              <td className="py-4 px-5">{user.username}</td>
              <td className="py-4 px-5">{user.name}</td>
              <td className="py-4 px-5 truncate">{user.lastname}</td>
              <td className="py-4 px-5 truncate">{user.roles.map((role) => t(`users.roles.${role.name}`)).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};