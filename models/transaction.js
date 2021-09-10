const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
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

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
