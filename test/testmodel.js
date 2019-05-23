
const MongoClient = require('mongodb').MongoClient;
const QuestionExtModel = require('../modules/models/QuestionModel');
const QuestionExtController = require('../modules/controllers/QuestionController');

describe('加法函数的测试', async function() {
    
    // Connection URL
    const url = 'mongodb://xxx';
    
    // Database Name
    const dbName = 'kb_drm';
    
    // Use connect method to connect to the server
    let client = null;
    let db = null;
    before(async function(){
        client = await MongoClient.connect(url);
        db = client.db(dbName);
    });
    it('第一波', async function() {
        let qem = new QuestionExtModel(db.collection('tqq'));
        let qc = new QuestionExtController(qem);
        let retval = await qc.list({});
        // let retval = await qem.getInstanceById('5ce39c9d45101db3adf9964e');
        // let retval = await qem.getInstances({period: '初中'}, {limit: 20});
        console.log(retval);
    });
    after(async function(){
        client.close();
   });
});