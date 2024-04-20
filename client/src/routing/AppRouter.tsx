import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { CustomHashLoader } from "@/widgets/hashloader";
const LandingPage = lazy(() => import("@/pages/Landing"));

const AppRouter = () => {

  return (
    <Suspense fallback={<CustomHashLoader color="#409099" size={60} />}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;

