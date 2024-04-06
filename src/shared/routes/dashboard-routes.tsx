import Loader from "@/components/ui/loader";
import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { getRoles } from "../utils/roles";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Enrollments = lazy(() => import("@/pages/dashboard/enrollments"));
const Enrollment = lazy(() => import("@/pages/dashboard/enrollment"));
const FollowUp = lazy(() => import("@/pages/dashboard/followup"));
const EAC = lazy(() => import("@/pages/dashboard/eac"));
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
const Objectives = lazy(() => import("@/pages/dashboard/objectives"));
const OrganisationUnits = lazy(
  () => import("@/pages/dashboard/organisation-units")
);
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
    readOrganisationUnitsRole,
    readEacRole,
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
      {readObjectivesRole && (
        <Route
          path="/objectives"
          element={
            <Suspense fallback={PageLoader}>
              <Objectives />
            </Suspense>
          }
        />
      )}
      {readEnrollmentsRole && (
        <Route
          path="/enrollments"
          element={
            <Suspense fallback={PageLoader}>
              <Enrollments />
            </Suspense>
          }
        />
      )}
      {readEnrollmentsRole && (
        <Route
          path="/enrollments/:id"
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
      {readEacRole && (
        <Route
          path="/eac"
          element={
            <Suspense fallback={PageLoader}>
              <EAC />
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
      {readOrganisationUnitsRole && (
        <Route
          path="/organisation-units"
          element={
            <Suspense fallback={PageLoader}>
              <OrganisationUnits />
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
      {(readFieldsRole || readFormsRole || readMenuRole) && (
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
