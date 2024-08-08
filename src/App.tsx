import React, { useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./Auth";
import { PageRoutes } from "./Routes";
import { initializeAdmin } from "./utils";

const App: React.FC = () => {
  useEffect(() => {
    initializeAdmin();
  }, []);
  return (
    <AuthProvider>
      <PageRoutes />
    </AuthProvider>
  );
};

export default App;
