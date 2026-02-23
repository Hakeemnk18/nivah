import LandingPage from "../features/user/pages/LandingPage"
import { lazy } from "react";
import { LandingLayout } from "../shared/layouts/LandingUserLayout";
import { DefaultUserLayout } from "../shared/layouts/DefualtUserLayout";


const ProductlisingPage = lazy(() => import("../features/products/component/productList/productListng"));
const ProductDetailsPage = lazy(() => import("../features/products/pages/ProductDetailsPage"));
const CartPage = lazy(() => import("../features/cart/pages/CartPage"));
const CheckoutPage = lazy(() => import("../features/order/pages/CeckoutPage"));
const OrderStatusPage = lazy(() => import("../features/order/pages/PaymentProcessing"));
const userRoutes = [
    {
        element: <LandingLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
        ],
    },
    {
        element: <DefaultUserLayout />,
        children: [
            {
                path: "products",
                element: <ProductlisingPage />,
            },
            {
                path: "productDetails",
                element: <ProductDetailsPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "checkout",
                element: <CheckoutPage />,
            },
            {
                path: "order-status/:orderId",
                element: <OrderStatusPage />,
            },
        ],
    },
];

export default userRoutes