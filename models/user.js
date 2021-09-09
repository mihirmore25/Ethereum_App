const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
    transactionId: {
        type: String,
        required: true
    },
    sendAddress: {
        type: String
    },
    receiveAddress: {
        type: String
    },
    amount: {
        type: String
    }
});

const User = mongoose.model("User", userAccountSchema);

module.exports = User;
