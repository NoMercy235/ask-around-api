const constants = require('./constants');

function exists (res, item) {
    if (!item) {
        res.status(constants.HTTP_CODES.NOT_FOUND).send();
        return false;
    }
    return true;
}

function initCallbacks () {
    let res = {};
    for (let key in constants.HTTP_TIMED_EVENTS) {
        if (constants.HTTP_TIMED_EVENTS.hasOwnProperty(key)) {
            res[key] = [];
        }
    }
    return res;
}

class BaseController {
    constructor (Resource, findByCb) {
        this.Resource = Resource;
        this.findByCb = findByCb;
        this.callbacks = initCallbacks();
    }

    get () {
        return (req, res) => {
            let query = this.Resource.find({});
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET].map(cb => cb(query));
            query.exec().then((items) => {
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_GET].map(cb => cb(res, items));
                res.json(items);
            }).catch((err) => {
                res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).json(err);
            });
        }
    }

    getOne () {
        return (req, res) => {
            let query = this.Resource.findOne(this.findByCb(req));
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET_ONE].map(cb => cb(query));
            query.exec().then((item) => {
                if (!exists(res, item)) return;
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_GET_ONE].map(cb => cb(res, item));
                res.json(item);
            }).catch((err) => {
                res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).json(err);
            });
        }
    }

    create () {
        return (req, res) => {
            let item = this.Resource(req.body);
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_CREATE].map(cb => cb(req, item));
            item.save().then((item) => {
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].map(cb => cb(res, item));
                res.json(item);
            }).catch((err) => {
                res.status(constants.HTTP_CODES.BAD_REQUEST).json(err);
            });
        }
    }

    update (userOptions) {
        let options = userOptions || { new: true, runValidators: true };

        return (req, res) => {
            let updateFields = this.Resource.updateFields(req.body);
            let query = this.Resource.findOneAndUpdate(this.findByCb(req), { $set: updateFields }, options);

            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_UPDATE].map(cb => cb(query));
            query.exec().then((item) => {
                    this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_UPDATE].map(cb => cb(res, item));
                    res.status(constants.HTTP_CODES.OK).json(item);
            }).catch((err) => {
                res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).json(err);
            });
        }
    }

    remove (userOptions) {
        let options = userOptions || {};

        return (req, res) => {
            let query = this.Resource.findOneAndRemove(this.findByCb(req), options);
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_REMOVE].map(cb => cb(query));
            query.exec().then((item) => {
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_REMOVE].map(cb => cb(res, item));
                res.status(constants.HTTP_CODES.OK).json(item);
            }).catch((err) => {
                res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).json(err);
            });
        }
    }
}

module.exports = BaseController;