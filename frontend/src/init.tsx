import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { resources } from "./locales/resources";
import App from './App';
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import store from "./store";

export const init = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: localStorage.getItem("language") || "ru",
      fallbackLng: "ru",
      interpolation: {
        escapeValue: false,
      },
      debug: true,
    });

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};