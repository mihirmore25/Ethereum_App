const express = require("express");
const router = express.Router();
const Web3 = require("web3");
// const Transaction = require("ethereumjs-tx").Transaction;

const Binance_Transaction = require("../models/binance_transaction");
const web3 = new Web3("https://bsc-testnet.web3api.com/v1/6GMM7M97XKA1GKX8VA62W1QQVKED6FIHSS");


router.get("/userTransactionDetails", (req, res) => {
    Binance_Transaction.find().exec((err, result) => {
        if (err) {
            res.json(err);
        }

        res.json(result);
    });
});


router.get("/userTransactionDetails/:transactionId", (req, res) => {
    Binance_Transaction.findById(req.params.transactionId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            res.json(transaction);
        }
    });
});

router.post("/userTransactionDetails", (req, res) => {
    web3.eth.getTransaction("0x26e83f347594500fb41d26c4446a88de01c0b0f84cbca738d63d8db90c21ad9c")
        .then(transaction => {
            const newTransaction = new Binance_Transaction({
                transactionId: transaction.hash,
                sendAddress: transaction.from,
                receiveAddress: transaction.to,
                amount: transaction.value
            });

            newTransaction.save();

            res.json(newTransaction);
        })
        .catch(err => {
            res.json(err);
        });
});


router.get("/userTransactionDetails/:userId/receiveAddressBalance", (req, res) => {
    Binance_Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            web3.eth.getBalance(transaction.receiveAddress)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });
});

router.get("/userTransactionDetails/:userId/sendAddressBalance", (req, res) => {
    Binance_Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            web3.eth.getBalance(transaction.sendAddress)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });
});

module.exports = router;
