const employeeModel = require('../model/employees-model');

async function createEmployee(request, response) {
    try {
        const payload = request.body;
        const data = await employeeModel.insertEmployee(payload);
        response.status(201).json(data);
    }
    catch (error) {
        response.status(500).json({
            errorMessage: error.message
        });
    }
}

async function retriveEmployees(request, response) {
    try {

        const data = await employeeModel.fetchAllEmployees();
        response.status(200).json(data);
    }
    catch (error) {
        response.status(500).json({
            errorMessage: error.message
        });
    }
}

async function retriveEmployee(request, response) {
    try {
        let id = request.params.id;
        const data = await employeeModel.getEmployeeById(id);
        response.status(200).json(data);
    }
    catch (error) {
        response.status(500).json({
            errorMessage: error.message
        });
    }
}

async function updateEmployee(request, response) {
    try {
        let id = request.params.id;
        const payload = request.body;
        const data = await employeeModel.updateEmployeeId(id, payload);
        response.status(200).json(data);
    }
    catch (error) {
        response.status(500).json({
            errorMessage: error.message
        });
    }
}

async function removeEmployee(request, response) {
    try {
        let id = request.params.id;
        const data = await employeeModel.deleteEmployee(id);
        response.status(200).json(data);
    }
    catch (error) {
        response.status(500).json({
            errorMessage: error.message
        });
    }
}

module.exports = {
    createEmployee,
    retriveEmployees,
    retriveEmployee,
    updateEmployee,
    removeEmployee
}