const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const binanceTransactionSchema = new Schema({
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

const Binance_Transaction = mongoose.model("Binance_Transaction", binanceTransactionSchema);

module.exports = Binance_Transaction;
