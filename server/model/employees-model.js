const model = require('../schema/employee-entity');

async function insertEmployee(payload) {
    try {
        const result = await model.create(payload);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function fetchAllEmployees() {
    try {
        const result = await model.find({}).exec();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getEmployeeById(id) {
    try {
        const result = model.findById(id).exec();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateEmployeeId(objectId, employee) {
    try {
        const result = model.findByIdAndUpdate(objectId, employee);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function deleteEmployee(id) {
    try {
        const result = model.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    insertEmployee,
    fetchAllEmployees,
    getEmployeeById,
    updateEmployeeId,
    deleteEmployee
}
