export const buildFilters = (allowedFilters, query) => {
    const filters = {};
    allowedFilters.forEach((key) => {
        if (query[key]) {
            if (query[key] === "true")
                filters[key] = true;
            else if (query[key] === "false")
                filters[key] = false;
            else
                filters[key] = query[key];
        }
    });
    return filters;
};
//# sourceMappingURL=make.filter.helper.js.map