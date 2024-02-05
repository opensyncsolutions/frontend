import { Routes, Route } from "react-router-dom";
import { useGetMe } from "./shared/services/auth";
import { PageLoader } from "./components/ui/loader";
import { Suspense, lazy } from "react";
import DashboardRoutes from "./shared/routes/dashboard-routes";
import Cookies from "js-cookie";

const Error = lazy(() => import("@/pages/error"));

// authentication pages
const Login = lazy(() => import("@/pages/authentication/login"));
const ForgotPassword = lazy(
  () => import("@/pages/authentication/forgot-password")
);

// authenticated pages
const Layout = lazy(() => import("@/layout"));

const App = () => {
  const token = Cookies.get("access-token");
  const { me, meError, meLoading, meRefetch } = useGetMe();
  if (meLoading) {
    return <PageLoader />;
  }
  if (
    meError &&
    !(meError?.response?.status === 404 || meError?.response?.status === 401)
  ) {
    return (
      <Error
        message={meError?.response?.data?.msg || meError?.message}
        refetch={() => meRefetch()}
        className="min-h-[100dvh]"
      />
    );
  }

  return (
    <Routes>
      {!me && !token && (
        <>
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<PageLoader />}>
                <ForgotPassword />
              </Suspense>
            }
          />
        </>
      )}
      {(me || token) && (
        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <Layout />
            </Suspense>
          }
        >
          {DashboardRoutes()}
        </Route>
      )}
    </Routes>
  );
};

export default App;
