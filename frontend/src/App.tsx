import React from "react";
import { SignupPage } from "./pages/SignupPage";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { routes } from "./routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales";

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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App