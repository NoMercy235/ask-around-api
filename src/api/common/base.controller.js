const EventEmitter = require('events');
const constants = require('./constants');

class BaseController {
    constructor (Resource, findByCb) {
        this.Resource = Resource;
        this.findByCb = findByCb;
        this.events = new EventEmitter();
    }

    _exists (res, item) {
        if (!item) {
            res.status(constants.HTTP_CODES.NOT_FOUND).send();
            return false
        }
        return true;
    }

    get () {
        return (req, res) => {
            this.events.emit(constants.HTTP_TIMED_EVENTS.BEFORE_GET);
            this.Resource.find({}, (err, items) => {
                if (err) {
                    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
                    return;
                }
                this.events.emit(constants.HTTP_TIMED_EVENTS.AFTER_GET);
                res.json(items);
            });
        }
    }

    getOne () {
        return (req, res) => {
            this.events.emit(constants.HTTP_TIMED_EVENTS.BEFORE_GET_ONE);
            this.Resource.findOne(this.findByCb(req), (err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
                    return;
                }
                if (!this._exists(res, item)) return;
                this.events.emit(constants.HTTP_TIMED_EVENTS.AFTER_GET_ONE);
                res.json(item);
            });
        }
    }

    create () {
        return (req, res) => {
            this.events.emit(constants.HTTP_TIMED_EVENTS.BEFORE_CREATE);
            let item = this.Resource(req.body);
            item.save((err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.BAD_REQUEST).send(err);
                    return;
                }
                this.events.emit(constants.HTTP_TIMED_EVENTS.BEFORE_CREATE);
                res.json(item);
            });
        }
    }

    update (userOptions) {
        let options = userOptions || { new: true };

        return (req, res) => {
            this.events.emit(constants.HTTP_TIMED_EVENTS.BEFORE_UPDATE);
            this.Resource.findOneAndUpdate(this.findByCb(req), req.body, options, (err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.BAD_REQUEST).send(err);
                    return;
                }
                if (!this._exists(res, item)) return;
                this.events.emit(constants.HTTP_TIMED_EVENTS.AFTER_UPDATE);
                res.status(constants.HTTP_CODES.OK).send(item);
            });
        }
    }

    remove () {
        return (req, res) => {
            this.events.emit(constants.HTTP_TIMED_EVENTS.BEFORE_REMOVE);
            this.Resource.findOneAndRemove(this.findByCb(req), {}, (err, item) => {
                if (err) {
                    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
                    return;
                }
                if (!this._exists(res, item)) return;
                this.events.emit(constants.HTTP_TIMED_EVENTS.AFTER_REMOVE);
                res.status(constants.HTTP_CODES.OK).send(item);
            });
        }
    }
}

module.exports = BaseController;