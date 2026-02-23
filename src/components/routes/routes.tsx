import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import SPPPage from "../../pages/SPPPage";
import FeedbackPage from "../../pages/FeedbackPage";
import ProfilePage from "../../pages/ProfilePage";
import PaymentDetail from "../../pages/PaymentDetail";
import MethodPayment from "../../pages/MethodPayment";
import PaymentPortal from "../../pages/PaymentPortal";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import QRISPage from "@/pages/QRISPage";
import ForgetPasswordUserCode from "@/pages/ForgetPasswordUserCode";
import ForgetPasswordChangePassword from "@/pages/ForgetPasswordChangePassword";
import ShowInvoicePrint from "@/pages/showPrint/ShowInvoicePrint";
import ReportPage from "@/pages/arisan/ReportPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const ROUTE_LOGIN = "/login";
export const ROUTE_HOME = "/";
export const ROUTE_SPP = "/spp";
export const ROUTE_FEEDBACK = "/feedback";
export const ROUTE_PROFILE = "/profile";
export const ROUTE_METHOD = "/metode";
export const ROUTE_FORGET_PASSWORD = "/forget-password";
export const ROUTE_ARISAN = "/arisan";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/nyoba",
        element: <PaymentPortal />,
      },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/arisan",
        element: <ReportPage />,
      },
      {
        path: ROUTE_FORGET_PASSWORD,
        element: <ForgetPasswordUserCode />,
      },
      {
        path: "/update-password",
        element: <ForgetPasswordChangePassword />,
      },
      {
        path: ROUTE_HOME,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_FEEDBACK,
        element: (
          <ProtectedRoute>
            <FeedbackPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_SPP,
        element: (
          <ProtectedRoute>
            <SPPPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTE_SPP}/view-spp/:ids`,
        element: (
          <ProtectedRoute>
            <ShowInvoicePrint />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTE_SPP}/view-spp/:ids/payment`,
        element: (
          <ProtectedRoute>
            <PaymentPortal />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTE_SPP}/:ids`,
        element: (
          <ProtectedRoute>
            <PaymentDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTE_SPP}/:ids/metode`,
        element: (
          <ProtectedRoute>
            <MethodPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTE_SPP}/:ids/metode/payment`,
        element: (
          <ProtectedRoute>
            <PaymentPortal />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTE_SPP}/:ids/metode/payment/qris`,
        element: (
          <ProtectedRoute>
            <QRISPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
