const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tronTransactionSchema = new Schema({
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

const Tron_Transaction = mongoose.model("Transaction", tronTransactionSchema);

module.exports = Tron_Transaction;
