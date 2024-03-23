import Loader from "@/components/ui/loader";
import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { getRoles } from "../utils/roles";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Enrollment = lazy(() => import("@/pages/dashboard/enrollment"));
const FollowUp = lazy(() => import("@/pages/dashboard/followup"));
const CashDisbursement = lazy(
  () => import("@/pages/dashboard/cash-disbursement")
);
const DataCollection = lazy(() => import("@/pages/dashboard/data-collection"));
const BloodCollection = lazy(
  () => import("@/pages/dashboard/blood-collection")
);

const Users = lazy(() => import("@/pages/dashboard/users"));

const RolesPrivileges = lazy(
  () => import("@/pages/dashboard/roles-privileges")
);
const Configurations = lazy(() => import("@/pages/dashboard/configurations"));

const Form = lazy(() => import("@/pages/dashboard/configurations/form"));

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
    readDisbursementsRole,
    readBloodCollectionRole,
    readDataCollectionRole,
    readMenuRole,
    readFieldsRole,
    readFormsRole,
    readObjectivesRole,
  } = getRoles(roles);

  return (
    <>
      <Route
        path="*"
        element={
          <Suspense fallback={PageLoader}>
            <Navigate to={"/dashboard"} replace />
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
          path="/enrollments"
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
      {readDisbursementsRole && (
        <Route
          path="/cash-disbursement"
          element={
            <Suspense fallback={PageLoader}>
              <CashDisbursement />
            </Suspense>
          }
        />
      )}
      {readDataCollectionRole && (
        <Route
          path="/data-collections"
          element={
            <Suspense fallback={PageLoader}>
              <DataCollection />
            </Suspense>
          }
        />
      )}
      {readBloodCollectionRole && (
        <Route
          path="/blood-collections"
          element={
            <Suspense fallback={PageLoader}>
              <BloodCollection />
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
      {(readFieldsRole ||
        readFormsRole ||
        readMenuRole ||
        readObjectivesRole) && (
        <Route
          path="/configurations"
          element={
            <Suspense fallback={PageLoader}>
              <Configurations />
            </Suspense>
          }
        />
      )}
      {readFormsRole && (
        <Route
          path="/configurations/forms/:formId"
          element={
            <Suspense fallback={PageLoader}>
              <Form />
            </Suspense>
          }
        />
      )}
    </>
  );
};

export default DashboardRoutes;
