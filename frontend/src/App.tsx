import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";

import { AuthProvider, useAuth } from "./context/AuthContext";
import store from "./store";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Header } from "./components/Header";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DocumentsPage } from "./pages/documents/DocumentsPage";
import { DocumentDetailsPage } from "./pages/documents/DocumentDetailsPage";
import { UsersPage } from "./pages/users/UsersPage";
import { UserDetailsPage } from "./pages/users/UserDetailsPage";
import { FilesPage } from "./pages/files/FilesPage";
import { routes } from "./routes";
import i18n from "./locales/i18n";
import { ModalComponent } from "./components/ModalComponent/ModalComponent";
import { FileDetailsPage } from "./pages/files/FileDetailsPage";

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
    <Provider store={store}>
      <AuthProvider>  
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <div className="h-screen text-slate-900" >
              <Header />
              <main className="h-[calc(100%-96px)] bg-slate-50">
                <div className="h-full p-8 flex flex-col items-center">
                  <Routes>
                  <Route element={<LoggedInRoute />}>
                    <Route path='documents/:id' element={<DocumentDetailsPage />} />
                    <Route path={routes.usersRoute()} element={<UsersPage />} />
                    <Route path={routes.documentsRoute()} element={<DocumentsPage />} />
                    <Route path='users/:id' element={<UserDetailsPage />} />
                    <Route path={routes.filesRoute()} element={<FilesPage />} />
                    <Route path='files/:id' element={<FileDetailsPage />} />
                  </Route>
                  <Route element={<LoggedOutRoute />}>
                    <Route path={routes.signupRoute()} element={<SignupPage />} />
                    <Route path={routes.loginRoute()} element={<LoginPage />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </div>
                <ModalComponent />
              </main>
            </div>
          </BrowserRouter>
          <ToastContainer progressClassName="text-red-100" />
        </I18nextProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App