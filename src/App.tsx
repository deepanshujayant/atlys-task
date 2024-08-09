import React, { useEffect, Suspense } from "react";
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
      <Suspense fallback={<center>Loading...</center>}>
        <PageRoutes />
      </Suspense>
    </AuthProvider>
  );
};

export default App;
