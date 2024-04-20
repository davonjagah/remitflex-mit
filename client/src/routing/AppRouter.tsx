import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CustomHashLoader } from "@/widgets/hashloader/hashloader";
const LandingPage = lazy(() => import("@/pages/Landing"));

const AppRouter = () => {

  return (
    <Suspense fallback={<CustomHashLoader color="#409099" size={60} />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

