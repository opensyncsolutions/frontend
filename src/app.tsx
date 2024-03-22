import { Routes, Route } from "react-router-dom";
import { useGetMe } from "./shared/services/auth";
import { PageLoader } from "./components/ui/loader";
import { Suspense, lazy, useEffect } from "react";
import DashboardRoutes from "./shared/routes/dashboard-routes";

const Error = lazy(() => import("@/pages/error"));

// authentication pages
const Login = lazy(() => import("@/pages/authentication/login"));

// authenticated layout
const Layout = lazy(() => import("@/layout"));

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

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
      {!me && !meLoading && (
        <>
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
        </>
      )}
      {me && !meLoading && (
        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <Layout />
            </Suspense>
          }
        >
          {DashboardRoutes(me?.roles || [])}
        </Route>
      )}
    </Routes>
  );
};

export default App;
