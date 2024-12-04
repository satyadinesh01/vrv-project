const mongoose = require('mongoose');

const employees = new mongoose.Schema({
    employeeName: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    employeeEmail: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    },
    roles: {
        type: mongoose.Schema.Types.String,
        required: true,
        default: ['developer'],
        enum: ['developer', 'manager', 'designer', 'salesManager'],
        trim: true
    }
}, {
    timestamps: true,
    strict: true,
    versionKey: false
});

module.exports = mongoose.model('Employee', employees);