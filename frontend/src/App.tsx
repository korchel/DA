import React from "react";
import { SignupPage } from "./pages/SignupPage";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { routes } from "./routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import { UserDetailsPage } from "./pages/UserDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UsersPage } from "./pages/UsersPage";
import { DocumentDetailsPage } from "./pages/DocumentDetailsPage";
import { useAuth } from "./context/AuthContext";

// const ProtectedRoute = () => {
//   const { userData } = useAuth();
//   return userData ? <Outlet /> : <Navigate to={routes.loginRoute()} />;
// };

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <div className="h-screen text-slate-900" >
          <Header />
          <main className="h-[calc(100%-96px)] bg-slate-50 ">
            <Routes>
              <Route path={routes.signupRoute()} element={<SignupPage />} />
              <Route path={routes.loginRoute()} element={<LoginPage />} />
              <Route path={routes.documentsRoute()} element={<DocumentsPage />} />
              <Route path={routes.usersRoute()} element={<UsersPage />} />
              <Route path='users/:id' element={<UserDetailsPage />} />
              <Route path='documents/:id' element={<DocumentDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App