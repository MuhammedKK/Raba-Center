import { Navigate, createBrowserRouter } from 'react-router'
import { routePaths } from './routePaths'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import AboutPage from '@/pages/AboutPage'
import BlogDetailPage from '@/pages/BlogDetailPage'
import BlogListPage from '@/pages/BlogListPage'
import BranchesPage from '@/pages/BranchesPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import ContactPage from '@/pages/ContactPage'
import CourseDetailPage from '@/pages/CourseDetailPage'
import CoursesListPage from '@/pages/CoursesListPage'
import FavoritesPage from '@/pages/FavoritesPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfilePage from '@/pages/ProfilePage'
import ServicesPage from '@/pages/ServicesPage'
import TrainerDetailPage from '@/pages/TrainerDetailPage'
import TrainersPage from '@/pages/TrainersPage'
import { AccountLayout } from '@/shared/layouts/AccountLayout'
import { MainLayout } from '@/shared/layouts/MainLayout'

export const router = createBrowserRouter([
  { index: true, element: <Navigate to="/ar" replace /> },
  {
    path: ':locale',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routePaths.about, element: <AboutPage /> },
      { path: routePaths.services, element: <ServicesPage /> },
      { path: routePaths.courses, element: <CoursesListPage /> },
      { path: routePaths.courseDetail(), element: <CourseDetailPage /> },
      { path: routePaths.trainers, element: <TrainersPage /> },
      { path: routePaths.trainerDetail(), element: <TrainerDetailPage /> },
      { path: routePaths.branches, element: <BranchesPage /> },
      { path: routePaths.blog, element: <BlogListPage /> },
      { path: routePaths.blogDetail(), element: <BlogDetailPage /> },
      { path: routePaths.contact, element: <ContactPage /> },
      { path: routePaths.login, element: <LoginPage /> },
      {
        element: <AccountLayout />,
        children: [
          { path: routePaths.favorites, element: <FavoritesPage /> },
          {
            path: routePaths.cart,
            element: (
              <AuthGuard>
                <CartPage />
              </AuthGuard>
            ),
          },
          {
            path: routePaths.checkout,
            element: (
              <AuthGuard>
                <CheckoutPage />
              </AuthGuard>
            ),
          },
          {
            path: routePaths.profile,
            element: (
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            ),
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
