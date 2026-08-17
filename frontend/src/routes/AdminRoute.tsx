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
const CampaignTable = lazy(() => import("../features/campaign/pages/CampaignList"))
const CreateCampaignPage = lazy(() => import("../features/campaign/pages/CreateCampaignPage"))





const adminRoutes = [
  {
    index: true,
    element: (
      <Suspense >
        <AdminBootstrap>
          <AdminDashboard />
        </AdminBootstrap>

      </Suspense>
    )
  },
  {
    path: "login",
    element: (
      <Suspense >
        <LoginPage role="admin" />
      </Suspense>
    ),
  },

  {
    path: "dashboard",
    element: (
      <Suspense >
        <AdminBootstrap>
          <AdminDashboard />
        </AdminBootstrap>

      </Suspense>
    ),
  },

  {
    path: "categoryManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CategoryTable />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "subCategoryManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CategoryTable />
        </AdminBootstrap>


      </Suspense>
    ),
  },

  {
    path: "createCategory",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateCategoryPage />
        </AdminBootstrap>

      </Suspense>
    ),
  },
  {
    path: "editCategory",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateCategoryPage />
        </AdminBootstrap>

      </Suspense>
    ),
  },

  {
    path: "productManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <ProductTable />
        </AdminBootstrap>



      </Suspense>
    ),
  },
  {
    path: "createProduct",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateProductPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "editProduct",
    element: (
      <Suspense >
        <AdminBootstrap>
          <EditProductPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "orderManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <OrderTable />
        </AdminBootstrap>
      </Suspense>
    ),
  },
  {
    path: "orderDetails/:orderId",
    element: (
      <Suspense >
        <AdminBootstrap>
          <AdminOrderDetailsPage />
        </AdminBootstrap>
      </Suspense>
    ),
  },
  {
    path: "reports/revenue",
    element: (
      <Suspense >
        <AdminBootstrap>
          <AdminRevenueReportPage />
        </AdminBootstrap>
      </Suspense>
    ),
  },
  {
    path: "heroManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <HeroTable />
        </AdminBootstrap>



      </Suspense>
    ),
  },
  {
    path: "createHero",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateHeroPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "editHero",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateHeroPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "bannerManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <BannerTable />
        </AdminBootstrap>



      </Suspense>
    ),
  },
  {
    path: "createBanner",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateBannerPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "editBanner",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateBannerPage />
        </AdminBootstrap>
      </Suspense>
    ),
  },
  {
    path: "testimonialManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <TestimonialTable />
        </AdminBootstrap>



      </Suspense>
    ),
  },
  {
    path: "createTestimonial",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateTestimonialPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "editTestimonial",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateTestimonialPage />
        </AdminBootstrap>


      </Suspense>
    ),
  },
  {
    path: "campaignManagement",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CampaignTable />
        </AdminBootstrap>
      </Suspense>
    ),
  },
  {
    path: "createCampaign",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateCampaignPage />
        </AdminBootstrap>
      </Suspense>
    ),
  },
  {
    path: "editCampaign",
    element: (
      <Suspense >
        <AdminBootstrap>
          <CreateCampaignPage />
        </AdminBootstrap>
      </Suspense>
    ),
  },
];

export default adminRoutes;
