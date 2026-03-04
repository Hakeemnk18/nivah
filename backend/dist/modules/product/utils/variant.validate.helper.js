export const assertUniqueVariantSizes = (variants) => {
    console.log("inside validate function ");
    const normalizedSizes = variants.map((v) => v.size.trim().toLowerCase());
    const uniqueSizeCount = new Set(normalizedSizes).size;
    return uniqueSizeCount === normalizedSizes.length;
};
//# sourceMappingURL=variant.validate.helper.js.map