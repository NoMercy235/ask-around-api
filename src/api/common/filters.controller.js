const mapFilter = {
    'like': (query, field, val) => query.find({[field]: { $regex: '.*' + val + '.*' }}),
    '<': (query, field, val) => query.find({[field]: { $lt: val }}),
    '<=': (query, field, val) => query.find({[field]: { $lte: val }}),
    '>': (query, field, val) => query.find({[field]: { $gt: val }}),
    '>=': (query, field, val) => query.find({[field]: { $gte: val }}),
    'in': (query, field, val) => query.find({[field]: { $in: val }}),
};

class Filter {
    constructor(resource) {
        this.resource = resource;
        this.allowedFields = this.resource.getAllowedFilters ? this.resource.getAllowedFilters() : [];
        this.allowedSort = this.resource.getAllowedFilters ? this.resource.getAllowedFilters() : [];
    }

    applyFilters(req, query) {
        if (!req.query.filter) return query;

        Object.keys(req.query.filter).forEach((key) => {
            if (this.allowedFields.indexOf(key) !== -1) {
                const filter = req.query.filter[key];
                query = mapFilter[filter.op](query, key, filter.val);
            }
        });
        return query;
    }

    applySorting(req, query) {
        if (!req.query.sort || this.allowedSort.indexOf(req.query.sort.field) === -1) return query;
        return query.sort({ [req.query.sort.field]: req.query.sort.order });
    }
}

module.exports = Filter;
