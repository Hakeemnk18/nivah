import { lazy, Suspense } from "react";

/* ---------- lazy imports ---------- */
const AdminBootstrap = lazy(
  () => import("../features/admin/components/AdminBootstrap")
);


const LoginPage = lazy(
  () => import("../features/auth/pages/LoginPage")
);
const CategoryTable = lazy(
  () => import("../features/category/pages/CategoryList")
);

const CreateCategoryPage = lazy(
  () => import("../features/category/pages/CreateCategoryForm")
);

const ProductTable = lazy(() => import("../features/products/pages/ProductList"))
const CreateProductPage = lazy(() => import("../features/products/pages/CreateProduct"))
const EditProductPage = lazy(() => import("../features/products/pages/EditProduct"))
const OrderTable = lazy(() => import("../features/order/pages/AdminOrdersTable"))
const AdminOrderDetailsPage = lazy(() => import("../features/order/pages/AdminOrderDetailsPage"))
const AdminDashboard = lazy(() => import("../features/admin/pages/AdminDashboard"))
const AdminRevenueReportPage = lazy(() => import("../features/reports/pages/RevenueReportPage"))
const HeroTable = lazy(() => import("../features/hero/pages/HeroList"))
const CreateHeroPage = lazy(() => import("../features/hero/pages/CreateHeroPage"))
const BannerTable = lazy(() => import("../features/banner/pages/BannerList"))
const CreateBannerPage = lazy(() => import("../features/banner/pages/CreateBannerPage"))
const TestimonialTable = lazy(() => import("../features/testimonial/pages/TestimonialList"))
const CreateTestimonialPage = lazy(() => import("../features/testimonial/pages/CreateTestimonialPage"))



/* ---------- fallback loader ---------- */
const Loader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#181a2a] gap-3">
    <div className="w-7 h-7 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
    <p className="text-sm text-gray-400">Loading admin data…</p>
  </div>
);

const adminRoutes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage role="admin" />
      </Suspense>
    ),
  },

  {
    path: "dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminDashboard />

      </Suspense>
    ),
  },

  {
    path: "categoryManagement",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminBootstrap>
          <CategoryTable />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "subCategoryManagement",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminBootstrap>
          <CategoryTable />
        </AdminBootstrap>


      </Suspense>
    ),
  },

  {
    path: "createCategory",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminBootstrap>
          <CreateCategoryPage />
        </AdminBootstrap>

      </Suspense>
    ),
  },
  {
    path: "editCategory",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminBootstrap>
          <CreateCategoryPage />
        </AdminBootstrap>

      </Suspense>
    ),
  },

  {
    path: "productManagement",
    element: (
      <Suspense fallback={<Loader />}>

        <ProductTable />



      </Suspense>
    ),
  },
  {
    path: "createProduct",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateProductPage />


      </Suspense>
    ),
  },
  {
    path: "editProduct",
    element: (
      <Suspense fallback={<Loader />}>

        <EditProductPage />


      </Suspense>
    ),
  },
  {
    path: "orderManagement",
    element: (
      <Suspense fallback={<Loader />}>
        <OrderTable />
      </Suspense>
    ),
  },
  {
    path: "orderDetails/:orderId",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminOrderDetailsPage />
      </Suspense>
    ),
  },
  {
    path: "reports/revenue",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminRevenueReportPage />
      </Suspense>
    ),
  },
  {
    path: "heroManagement",
    element: (
      <Suspense fallback={<Loader />}>

        <HeroTable />



      </Suspense>
    ),
  },
  {
    path: "createHero",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateHeroPage />


      </Suspense>
    ),
  },
  {
    path: "editHero",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateHeroPage />


      </Suspense>
    ),
  },
  {
    path: "bannerManagement",
    element: (
      <Suspense fallback={<Loader />}>

        <BannerTable />



      </Suspense>
    ),
  },
  {
    path: "createBanner",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateBannerPage />


      </Suspense>
    ),
  },
  {
    path: "editBanner",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateBannerPage />


      </Suspense>
    ),
  },
  {
    path: "testimonialManagement",
    element: (
      <Suspense fallback={<Loader />}>

        <TestimonialTable />



      </Suspense>
    ),
  },
  {
    path: "createTestimonial",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateTestimonialPage />


      </Suspense>
    ),
  },
  {
    path: "editTestimonial",
    element: (
      <Suspense fallback={<Loader />}>

        <CreateTestimonialPage />


      </Suspense>
    ),
  },
];

export default adminRoutes;
