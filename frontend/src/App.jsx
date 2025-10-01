import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { useUserStore } from "./store/useUserStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
