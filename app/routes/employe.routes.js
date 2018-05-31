
module.exports = (app)=>{

    const employee = require('../controllers/employeController');

    app.get('/employee',employee.getEmploye);
    app.get('/employee/:employeId',employee.getOneEmploye);
    app.post('/employee',employee.createEmploye);
    app.put('/employee/:employeId',employee.updateEmploye);
    app.delete('/employee/:employeId',employee.deleteEmploye);
};