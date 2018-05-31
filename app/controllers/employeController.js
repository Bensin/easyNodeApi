
const Employee = require('../models/employee');

getEmploye=(req, res)=>{
    Employee.find()
            .then(employee =>{
                res.send(employee);
            }).catch(err =>{
               return res.status(500).send({message:"error occured while fetching employee"});
            });
};

getOneEmploye=(req, res)=>{
    Employee.findById(req.params.employeId)
            .then(employee =>{
                if(!employee){
                   return  res.status(400).send({message:"error occured while fetching employee"});
                }
                res.send(employee);
            }).catch(err =>{
                if(err.kind == 'ObjectId'){
                    return res.status(400).send({message:"some error with "+employeId});
                }
                return res.status(500).send({message:"some error with "+employeId})
            });
};

createEmploye = (req,res)=>{
    if(!req.body.name){
        return res.status(400).send({message:"error occured"});
    }
    const emp = new Employee({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    });

    emp.save()
        .then(employee=>{
            res.send(employee);
        }).catch(err =>{
            return res.status(500).send({message:"some error occured"});
        });
};

updateEmploye=(req,res)=>{
    Employee.findByIdAndUpdate(res.params.employeId,{
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    },{new:true})
            .then(employee=>{
                if(!employee){
                    return res.status(400).send({message:"error in update"});
                }
                res.send(employee);
            }).catch(err=>{
                if(err.kind == 'ObjectId'){
                    return res.status(400).send({message:"some error with "+employeId});
                }
                return res.status(500).send({message:"some error with "+employeId})
            });
};

deleteEmploye=(req, res)=>{
    Employee.findByIdAndRemove(req.params.employeId)
            .then(employee=>{
                if(!employee){
                    return res.status(400).send({message:"error in delete"});
                }
                res.send(employee);
            }).catch(err=>{
                if(err.kind == 'ObjectId'){
                    return res.status(400).send({message:"some error with "+employeId});
                }
                return res.status(500).send({message:"some error with "+employeId})
            });
}

module.exports = {
    getEmploye:getEmploye,
    getOneEmploye:getOneEmploye,
    createEmploye:createEmploye,
    updateEmploye:updateEmploye,
    deleteEmploye:deleteEmploye
};