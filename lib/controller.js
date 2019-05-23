/**
 * 
 */
const _ = require('underscore');

class ControllerBase {
    constructor(model) {
        this.model = model;
    }
    /* virtual */
    async beforeGet() {
        return {};
    }
    /* virtual */
    async afterGet(retval) {
        return retval;
    }
    /* Template Method */
    async get(id) {
        try {
            // let project = await this.beforeGet();
            let retval = await this.model.getInstanceById(id);
            retval = await this.afterGet(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeAdd() {
        return {};
    }
    /* virtual */
    async afterAdd(retval) {
        return retval;
    }
    /* Template Method */
    async add(body) {
        try {
            let retval = await this.model.addInstance(body);
            retval = await this.afterAdd(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeUpdate() {
        return {};
    }
    /* virtual */
    async afterUpdate(retval) {
        return retval;
    }
    /* Template Method */
    async update(id, body) {
        try {
            let retval = await this.model.updateInstance(id, body);
            retval = await this.afterUpdate(id, retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeList() {
        return {};
    }
    /* virtual */
    async afterList(retval) {
        return retval;
    }
    /* Template Method */
    async list(cond) {
        try {
            let data = await this.model.getInstances(cond);
            data = await this.afterList(data);
            let retval = {total_num: 0, list: []};
            retval.total_num = await this.model.count(cond);
            retval.list = data;
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeRemove() {
        return {};
    }
    /* virtual */
    async afterRemove(retval) {
        return retval;
    }
    /* Template Method */
    async remove(id) {
        try {
            let retval = await this.model.getRemoveInstanceById(id);
            retval = await this.afterRemove(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ControllerBase;