import { PageLogout } from '@/app/auth-archive/PageLogout';
import { LoginScreen } from '@/app/auth/LoginScreen';
import { Layout, Loader } from '@/app/layout';
import {
  AdminRouteGuard,
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard
} from '@/app/router/guards';
import { Error404, ErrorBoundary } from '@/errors';
import React, { Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './home/HomeScreen';




const AdminRoutes = React.lazy(() => import('@/app/admin/AdminRoutes'));
const AccountRoutes = React.lazy(() => import('@/app/account/AccountRoutes'));
const DashboardRoutes = React.lazy(
  () => import('@/app/dashboard/DashboardRoutes')
);

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/homePage" replace />} />

              <Route
                path="homePage"
                element={
                  <PublicOnlyRouteGuard>
                    <HomeScreen />
                  </PublicOnlyRouteGuard>
                }
              />
              <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <LoginScreen />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path="logout"
                element={
                  <ErrorBoundary>
                    <PageLogout />
                  </ErrorBoundary>
                }
              />

              <Route
                path="account/*"
                element={
                  <ErrorBoundary>
                    <AccountRoutes />
                  </ErrorBoundary>
                }
              />

              <Route
                path="dashboard/*"
                element={
                  <AuthenticatedRouteGuard>
                    <DashboardRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="admin/*"
                element={
                  <AdminRouteGuard>
                    <AdminRoutes />
                  </AdminRouteGuard>
                }
              />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
