import { buildFilters } from "./make.filter.helper.js";
export function parseReq(req, filtersArr) {
    const filters = buildFilters(filtersArr, req.query);
    return {
        page: req.query.page,
        search: req.query.search,
        limit: req.query.limit,
        sortValue: req.query.sort,
        filters,
    };
}
//# sourceMappingURL=parse.query.helper.js.map