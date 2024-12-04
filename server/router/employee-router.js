const employeeController = require('../controller/employeeController.js');
var express = require('express');
var router = express.Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.retriveEmployees);
router.get('/:id', employeeController.retriveEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.removeEmployee);

module.exports= router;