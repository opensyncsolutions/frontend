import Loader from "@/components/ui/loader";
import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { getRoles } from "../utils/roles";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Enrollment = lazy(() => import("@/pages/dashboard/enrollment"));
const FollowUp = lazy(() => import("@/pages/dashboard/followup"));
const Users = lazy(() => import("@/pages/dashboard/users"));

const RolesPrivileges = lazy(
  () => import("@/pages/dashboard/roles-privileges")
);

const DashboardRoutes = (roles: Role[]) => {
  const PageLoader = (
    <div className="flex justify-center h-40">
      <Loader />
    </div>
  );

  const {
    readAuthorityRole,
    readEnrollmentsRole,
    readRolesRole,
    readUsersRole,
    readFollowUpsRole,
  } = getRoles(roles);

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
      {readEnrollmentsRole && (
        <Route
          path="/enrollment"
          element={
            <Suspense fallback={PageLoader}>
              <Enrollment />
            </Suspense>
          }
        />
      )}
      {readFollowUpsRole && (
        <Route
          path="/followup"
          element={
            <Suspense fallback={PageLoader}>
              <FollowUp />
            </Suspense>
          }
        />
      )}
      {readUsersRole && (
        <Route
          path="/users"
          element={
            <Suspense fallback={PageLoader}>
              <Users />
            </Suspense>
          }
        />
      )}
      {(readAuthorityRole || readRolesRole) && (
        <Route
          path="/roles-and-privileges"
          element={
            <Suspense fallback={PageLoader}>
              <RolesPrivileges />
            </Suspense>
          }
        />
      )}
    </>
  );
};

export default DashboardRoutes;
