const userModel = require("./schema/user");
const {connect} = require("mongoose");

(async () => {
    connect("mongodb://localhost:27017/todo-test-db");
    await userModel.updateMany({}, {
        role: "user"
    });
    console.log("Done");
})();