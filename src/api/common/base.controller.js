const constants = require('./constants');

function exists (res, item) {
    if (!item) {
        res.status(constants.HTTP_CODES.NOT_FOUND).send();
        return false
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
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET].map(cb => cb());
            this.Resource.find({}, (err, items) => {
                if (err) {
                    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
                    return;
                }
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_GET].map(cb => cb(res, items));
                res.json(items);
            });
        }
    }

    getOne () {
        return (req, res) => {
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET_ONE].map(cb => cb());
            this.Resource.findOne(this.findByCb(req), (err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
                    return;
                }
                if (!exists(res, item)) return;
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_GET_ONE].map(cb => cb(res, item));
                res.json(item);
            });
        }
    }

    create () {
        return (req, res) => {
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_CREATE].map(cb => cb());
            let item = this.Resource(req.body);
            item.save((err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.BAD_REQUEST).send(err);
                    return;
                }
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].map(cb => cb(res, item));
                res.json(item);
            });
        }
    }

    update (userOptions) {
        let options = userOptions || { new: true };

        return (req, res) => {
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_UPDATE].map(cb => cb());
            this.Resource.findOneAndUpdate(this.findByCb(req), req.body, options, (err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.BAD_REQUEST).send(err);
                    return;
                }
                if (!this._exists(res, item)) return;
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_UPDATE].map(cb => cb(res, item));
                res.status(constants.HTTP_CODES.OK).send(item);
            });
        }
    }

    remove () {
        return (req, res) => {
            this.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_REMOVE].map(cb => cb());
            this.Resource.findOneAndRemove(this.findByCb(req), {}, (err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
                    return;
                }
                if (!this._exists(res, item)) return;
                this.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_REMOVE].map(cb => cb(res, item));
                res.status(constants.HTTP_CODES.OK).send(item);
            });
        }
    }
}

module.exports = BaseController;