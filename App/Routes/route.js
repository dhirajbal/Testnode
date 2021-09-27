module.exports = (app)=>{

    const controller = require('../Controllers/Work_shift'); // workshift controller 

    app.post('/workshift', controller.Create);
    app.get('/workshift',controller.getAll);
    app.get('/workshift/:id',controller.getOne);
    app.put('/workshift/:id',controller.Update);
    app.delete('/workshift/:id',controller.Delete);

}