const TQ7 = require('../../main');

class QuestionExtController extends TQ7.ControllerBase {
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
            period: 1,
            subject: 1
        }
    }
}

module.exports = QuestionExtController;