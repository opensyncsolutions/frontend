import Loader from "@/components/ui/loader";
import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Enrollment = lazy(() => import("@/pages/dashboard/enrollment"));
const Users = lazy(() => import("@/pages/dashboard/users"));

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
            <Navigate to={"/dashboard"} />
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
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
      <Route
        path="/users"
        element={
          <Suspense fallback={PageLoader}>
            <Users />
          </Suspense>
        }
      />
    </>
  );
};

export default DashboardRoutes;
