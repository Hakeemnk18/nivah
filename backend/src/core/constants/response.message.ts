export const ResponseMessages = {

  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
  OTP_SEND: "OTP sent to email",
  SUCCESS: "Request successful",
  ID_MISSING: "ID parameter is required",
  INVALID_ID: "Invalid ID format.",

  VALIDATION_FAILED: 'Validation failed',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  FAILED_TO_MAP: 'Failed to map newly created user from database',
  SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Unauthorized access',
  ACCESS_DENIED: 'Access denied',
  TOO_MANY_REQUESTS: "Too Many Requests",
  JWT_ENV_NOT_SET: "JWT environment variables are not set!",
  USER_ALREADY_VERIFIED: "User already verified",
  USER_NOT_VERIFIED: "User not verified",
  REFRESH_TOKEN_REQUIRED: "Refresh token is required",
  INVALID_OTP: "Invalid or expired OTP",
  RESEND_OTP_SUCCESS: "A new OTP has been sent to your email.",
  INVALID_GOOGLE_TOKEN: "Invalid or expired Google token",
  GOOGLE_SERVICE_ERROR: "Could not connect to Google service",
  GOOGLE_EMAIL_NOT_FOUND: "GOOGLE_EMAIL_NOT_FOUND",
  UNVERIFIED_GOOGLE_EMAIL: "UNVERIFIED_GOOGLE_EMAIL",
  GOOGLE_ACCOUNT_CONFLICT: "GOOGLE_ACCOUNT_CONFLICT",
  REFRESH_TOKEN_INVALID: "Refresh token expired or invalid",

  TOKEN_CREATION_FAILED: "Failed to create password reset token",
  EMAIL_SEND_FAILED: "Failed to send password reset email",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired password reset token",
  PASSWORD_RESET_SUCCESS: "Password has been reset successfully",
  TOKEN_NOT_FOUND: "Password reset token not found",
  PASSWORD_SAME_AS_OLD: "New password cannot be the same as the old password",
  PASSWORD_UPDATE_FAILED: "Failed to update password",
  TOKEN_ALREADY_USED: "This password reset token has already been used",
  RESET_LINK_EXPIRED: "Your password reset link has expired",
  RESET_REQUEST_SUCCESS: "Password reset link sent successfully to your email",
  RESET_TOKEN_ALREADY_SENT: "A password reset link has already been sent. Please check your email or try again later.",

  // Creation / Update
  CATEGORY_CREATE_FAILED: "Failed to create category",
  CATEGORY_UPDATE_FAILED: "Failed to update category",
  CATEGORY_DELETE_FAILED: "Failed to delete category",

  // Validation
  CATEGORY_NAME_REQUIRED: "Category name is required",
  CATEGORY_NAME_ALREADY_EXISTS: "Category with this name already exists",
  INVALID_PARENT_CATEGORY: "Invalid parent category",
  PARENT_CATEGORY_NOT_FOUND: "Parent category not found",
  CANNOT_SET_SELF_AS_PARENT: "Category cannot be its own parent",
  CIRCULAR_CATEGORY_REFERENCE: "Circular category reference detected",

  // Status
  CATEGORY_ALREADY_INACTIVE: "Category already inactive",
  CATEGORY_ALREADY_ACTIVE: "Category already active",
  CATEGORY_DEACTIVATION_FAILED: "Failed to deactivate category",
  CATEGORY_ACTIVATION_FAILED: "Failed to activate category",

  // Fetching
  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORY_LIST_FETCH_FAILED: "Failed to fetch categories",

  // Constraints
  CATEGORY_HAS_SUBCATEGORIES: "Category has subcategories and cannot be deleted",
  CATEGORY_HAS_PRODUCTS: "Category is assigned to products and cannot be deleted",

  // Success
  CATEGORY_CREATED_SUCCESS: "Category created successfully",
  CATEGORY_UPDATED_SUCCESS: "Category updated successfully",
  CATEGORY_DELETED_SUCCESS: "Category deleted successfully",
  CATEGORY_STATUS_UPDATED_SUCCESS: "Category status updated successfully",

  // Activation / Status
  PRODUCT_ALREADY_ACTIVE: "Product already active",
  PRODUCT_ALREADY_INACTIVE: "Product already inactive",
  PRODUCT_ACTIVATION_FAILED: "Failed to activate product",
  PRODUCT_DEACTIVATION_FAILED: "Failed to deactivate product",

  // Fetching
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_LIST_FETCH_FAILED: "Failed to fetch products",
  PRODUCT_FETCH_FAILED: "Failed to fetch product",

  // Creation / Update
  PRODUCT_CREATION_FAILED: "Failed to create product",
  PRODUCT_UPDATE_FAILED: "Failed to update product",
  PARENT_CATEGORY_NOT_USE_FOR_PRODUCT: "Parent category not use for product",

  // Deletion
  PRODUCT_DELETION_FAILED: "Failed to delete product",
  PRODUCT_ALREADY_DELETED: "Product already deleted",

  // Constraints
  PRODUCT_HAS_ACTIVE_VARIANTS: "Product has active variants and cannot be deactivated",
  PRODUCT_OUT_OF_STOCK: "Product is out of stock",
  PRODUCT_VARIANT_NOT_FOUND: "Product variant not found",
  PRODUCT_DUPLICATE_VARIANT_SIZE: "Duplicate product variant size",


  // Status / Flags
  PRODUCT_ALREADY_FEATURED: "Product already featured",
  PRODUCT_NOT_FEATURED: "Product is not featured",
  PRODUCT_FEATURE_FAILED: "Failed to feature product",
  PRODUCT_UNFEATURE_FAILED: "Failed to unfeature product",

  // Success
  PRODUCT_CREATED_SUCCESS: "Product created successfully",
  PRODUCT_UPDATED_SUCCESS: "Product updated successfully",
  PRODUCT_DELETED_SUCCESS: "Product deleted successfully",
  PRODUCT_STATUS_UPDATED_SUCCESS: "Product status updated successfully",
  PRODUCT_FEATURE_UPDATED_SUCCESS: "Product feature status updated successfully",

  INVALID_CLOUDINARY_PUBLIC_ID: "Invalid Cloudinary public ID",
  DELETE_CLOUDINARY_IMAGE_FAILED: "Failed to delete Cloudinary image",

  VARIANT_NOT_FOUND: "Variant not found",
  VARIANT_ADD_SUCCESS: " Product variant added",
  VARIANT_EDIT_SUCCESS: " Product variant updated",

  CART_NOT_FOUND: "Cart not found",
  CART_FETCH_FAILED: "Failed to fetch cart",

  // Item operations
  CART_ITEM_NOT_FOUND: "Cart item not found",
  CART_ADD_FAILED: "Failed to add item to cart",
  CART_UPDATE_FAILED: "Failed to update cart item",
  CART_REMOVE_FAILED: "Failed to remove item from cart",

  // Validation
  CART_EMPTY: "Cart is empty",
  CART_INVALID_QUANTITY: "Invalid quantity",
  CART_ITEM_OUT_OF_STOCK: "Item is out of stock",
  CART_QUANTITY_EXCEEDS_STOCK: "Requested quantity exceeds available stock",

  // Success
  CART_ITEM_ADDED_SUCCESS: "Item added to cart successfully",
  CART_ITEM_UPDATED_SUCCESS: "Cart item updated successfully",
  CART_ITEM_REMOVED_SUCCESS: "Item removed from cart successfully",
  CART_CLEARED_SUCCESS: "Cart cleared successfully",

  INVALID_CART_OWNER: "Invalid cart owner.",
  CART_CREATE_FAILED: "Failed to create cart.",

  INVALID_QUANTITY: "Invalid quantity.",
  OUT_OF_STOCK: "Product is out of stock.",
  ITEM_NOT_FOUND: "Cart item not found.",
  CART_COUNT_UPDATED_SUCCESS: "Cart count updated successfully",


  ORDER_NOT_FOUND: "Order not found",
  ORDER_FETCH_FAILED: "Failed to fetch order",
  ORDER_LIST_FETCH_FAILED: "Failed to fetch orders",
  ORDER_CREATE_FAILED: "Failed to create order",
  ORDER_ALREADY_EXISTS: "Order already exists",

  INVALID_ORDER_ID: "Invalid order ID",
  INVALID_ORDER_OWNER: "Invalid order owner",

  /* ================= ORDER VALIDATION ================= */

  ORDER_EMPTY_ITEMS: "Order must contain at least one item",
  ORDER_INVALID_TOTAL: "Invalid order total amount",
  ORDER_INVALID_STATUS: "Invalid order status",
  ORDER_CANNOT_BE_MODIFIED: "Order cannot be modified",

  ORDER_ALREADY_CANCELLED: "Order is already cancelled",
  ORDER_ALREADY_DISPATCHED: "Order already dispatched",
  ORDER_CANNOT_CANCEL_DISPATCHED: "Dispatched order cannot be cancelled",

  ORDER_STATUS_TRANSITION_INVALID: "Invalid order status transition",

  /* ================= ORDER STATUS SUCCESS ================= */

  ORDER_CREATED_SUCCESS: "Order created successfully",
  ORDER_CONFIRMED_SUCCESS: "Order confirmed successfully",
  ORDER_ACCEPTED_SUCCESS: "Order accepted successfully",
  ORDER_DISPATCHED_SUCCESS: "Order dispatched successfully",
  ORDER_CANCELLED_SUCCESS: "Order cancelled successfully",

  ORDER_STATUS_UPDATED_SUCCESS: "Order status updated successfully",

  /* ================= PAYMENT ================= */

  PAYMENT_NOT_FOUND: "Payment not found",
  PAYMENT_CREATE_FAILED: "Failed to create payment",
  PAYMENT_VERIFICATION_FAILED: "Payment verification failed",
  PAYMENT_ALREADY_VERIFIED: "Payment already verified",

  INVALID_PAYMENT_ID: "Invalid payment ID",
  INVALID_PAYMENT_SIGNATURE: "Invalid payment signature",

  PAYMENT_PENDING: "Payment is pending",
  PAYMENT_FAILED: "Payment failed",
  PAYMENT_SUCCESS: "Payment successful",

  PAYMENT_CAPTURE_FAILED: "Failed to capture payment",

  /* ================= CHECKOUT ================= */

  CHECKOUT_FAILED: "Failed to process checkout",
  CHECKOUT_INVALID_CART: "Invalid cart for checkout",
  CHECKOUT_CART_EMPTY: "Cart is empty",
  CHECKOUT_OUT_OF_STOCK: "Some items are out of stock",
  CART_IS_EMPTY: "Cart is empty",
  PRODUCT_PRICE_CHANGED: "Product price has changed. Please review your cart.",

  /* ================= STOCK / ORDER FLOW ================= */

  ORDER_STOCK_VALIDATION_FAILED: "Stock validation failed",
  ORDER_ITEM_OUT_OF_STOCK: "One or more items are out of stock",
  ORDER_STOCK_UPDATED_SUCCESS: "Stock updated successfully",
  INVALID_ORDER_TOTAL: "Invalid order total",
  FAILED_TO_CREATE_ORDER: "Failed to create order",
  PAYMENT_NOT_CAPTURED: "Payment no captured",

  /* ================= ORDER NUMBER ================= */

  ORDER_NUMBER_GENERATION_FAILED: "Failed to generate order number",
  INVALID_PAYMENT_AMOUNT: "Invalid payment amount",
  INVALID_PAYMENT_ORDER_ID: "Invalid payment order ID",
  ORDER_ALREADY_CONFIRMED: "Order is already confirmed",

}