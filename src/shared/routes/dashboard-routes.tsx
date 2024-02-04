import Loader from "@/components/ui/loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Enrollment = lazy(() => import("@/pages/dashboard/enrollment"));

const DashboardRoutes = () => {
  const PageLoader = (
    <div className="flex justify-center h-40">
      <Loader />
    </div>
  );
  return (
    <>
      <Route
        path="*"
        element={
          <Suspense fallback={PageLoader}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/enrollment"
        element={
          <Suspense fallback={PageLoader}>
            <Enrollment />
          </Suspense>
        }
      />
    </>
  );
};

export default DashboardRoutes;
