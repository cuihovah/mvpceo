/**
 * 
 */
const ObjectID = require('mongodb').ObjectID;
const _ = require('underscore');

class ModelBase {
    constructor(collection) {
        this.collection = collection;
    }
    /* virtual */
    async beforeGetInstanceById() {
        return {};
    }
    /* virtual */
    async afterGetInstanceById(retval) {
        let data = {id: retval._id}
        delete retval._id;
        Object.assign(data, retval);
        return data;
    }
    /* Template Method */
    async getInstanceById(id) {
        try {
            let project = this.beforeGetInstanceById();
            let retval = await this.collection.findOne({
                _id: ObjectID(id)
            }, {fields: project});
            retval = await this.afterGetInstanceById(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeGetInstances() {
        return {}
    }
    /* virtual */
    async afterGetInstances(retval) {
        try {
            retval = _.map(retval, (x) => {
                let data = {id: x._id};
                delete x._id;
                Object.assign(data, x);
                return data;
            });
        } catch (err) {
            return retval;
        }
        return retval;
    }
    /* Template Method */
    async getInstances(cond, options) {
        try {
            if (!!options === false) {
                options = {};
            }
            let project = await this.beforeGetInstances();
            let limit = options.limit ? options.limit * 1 : 10; 
            let skip = options.skip ? options.skip * 1 : 0; 
            let cur = await this.collection.find(cond).project(project).limit(limit).skip(skip);
            if (!!options.sort === true && typeof options.sort === 'object') {
                cur = cur.sort(options.sort);
            }
            let retval = await cur.toArray();
            retval = this.afterGetInstances(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    
    /* Template Method */
    async count(cond) {
        try {
            let count = await this.collection.count(cond);
            return count;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeAddInstance(body) {
        return body;
    }
    /* virtual */
    async afterAddInstance(retval) {
        return retval;
    }
    /* Template Method */
    async addInstance(body) {
        try {
            body = await this.beforeAddInstance(body);
            let retval = await this.collection.insertOne(body);
            retval = await this.afterAddInstance(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async beforeUpdateInstance(body) {
        return {$set: body};
    }
    /* virtual */
    async afterUpdateInstance(retval) {
        return retval;
    }
    /* Template Method */
    async updateInstance(id, body) {
        try {
            body = await this.beforeUpdateInstance(body);
            let retval = await this.collection.updateOne({
                _id: ObjectID(id)
            }, body);
            retval = await this.afterUpdateInstance(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
    /* virtual */
    async afterRemoveInstanceById(retval) {
        return retval;
    }
    /* Template Method */
    async removeInstanceById(id) {
        try {
            // let project = this.beforeRemoveInstanceById();
            let retval = await this.collection.remove({
                _id: ObjectID(id)
            });
            retval = await this.afterRemoveInstanceById(retval);
            return retval;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ModelBase;