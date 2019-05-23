const TQ7 = require('../../main');

class QuestionExtModel extends TQ7.ModelBase {
    constructor(collection) {
        super(collection);
    }
    beforeGetInstanceById() {
        return {
            period: 1,
            subject: 1
        }
    }
    beforeGetInstances() {
        return {
            name: 1,
        }
    }
}

module.exports = QuestionExtModel;