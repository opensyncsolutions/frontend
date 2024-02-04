import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { API_URL } from "./shared/constants/constants";
import { useGetMe } from "./shared/services/auth";
import { PageLoader } from "./components/ui/loader";
import { Suspense, lazy } from "react";

const Error = lazy(() => import("@/pages/error"));

// authentication pages
const Login = lazy(() => import("@/pages/authentication/login"));
const ForgotPassword = lazy(
  () => import("@/pages/authentication/forgot-password")
);

// dashboard pages
const Home = lazy(() => import("@/pages/dashboard/home"));

// import DashboardRoutes from "./shared/routes/dashboard-routes";

axios.defaults.baseURL = API_URL;

const App = () => {
  const { me, meError, meLoading, meRefetch } = useGetMe();

  if (meLoading) {
    return <PageLoader />;
  }

  if (
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
    <div className="">
      <Routes>
        {!me && (
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
        {!me && (
          <Route
            element={
              <Suspense fallback={<PageLoader />}>
                {/* use dashboard layout as a page with Outlet as its children and then use outlet to do inner routing nesting */}
                <Home />
              </Suspense>
            }
            path="*"
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
