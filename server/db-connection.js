const mongoose = require('mongoose');
const connection = mongoose.connect(getDbURL(), {
    connectTimeoutMS: 5000
});

function getDbURL() {
    console.log('Connected to database');
    return `mongodb+srv://dinesh5510:Dinesh5510@cluster0.st0na.mongodb.net/vrv-role-management?retryWrites=true&w=majority&appName=Cluster0`
}

mongoose.connection.on("connected", function () {
    console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
});