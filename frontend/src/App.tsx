import React from "react";
import { SignupPage } from "./pages/SignupPage";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen text-slate-900" >
        <Header />
        <main className="h-[calc(100%-96px)] bg-slate-50 ">
          <Routes>
            <Route path="signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App