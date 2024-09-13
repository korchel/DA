import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useAuth } from "./context/AuthContext";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DocumentsPage } from "./pages/documents/DocumentsPage";
import { DocumentDetailsPage } from "./pages/documents/DocumentDetailsPage";
import { UsersPage } from "./pages/users/UsersPage";
import { UserDetailsPage } from "./pages/users/UserDetailsPage";
import { FilesPage } from "./pages/files/FilesPage";
import { routes } from "./routes";
import { Layout } from "./components/Layout";
import { FileDetailsPage } from "./pages/files/FileDetailsPage";
import { SearchPage } from "./pages/search/SearchPage";

const LoggedInRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to={routes.loginRoute()} />;
};

const LoggedOutRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to={routes.documentsRoute()} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route element={<LoggedInRoute />}>
            <Route path='documents/:id' element={<DocumentDetailsPage />} />
            <Route path={routes.usersRoute()} element={<UsersPage />} />
            <Route path={routes.documentsRoute()} element={<DocumentsPage />} />
            <Route path='users/:id' element={<UserDetailsPage />} />
            <Route path={routes.filesRoute()} element={<FilesPage />} />
            <Route path='files/:id' element={<FileDetailsPage />} />
            <Route path={routes.searchRoute()} element={<SearchPage />} />
          </Route>
          <Route element={<LoggedOutRoute />}>
            <Route path={routes.signupRoute()} element={<SignupPage />} />
            <Route path={routes.loginRoute()} element={<LoginPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;