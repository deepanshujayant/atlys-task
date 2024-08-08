import React from "react";
import "./App.css";
import { AuthProvider } from "./Auth";
import { PageRoutes } from "./Routes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PageRoutes />
    </AuthProvider>
  );
};

export default App;
