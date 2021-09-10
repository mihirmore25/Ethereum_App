const express = require("express");
const router = express.Router();
const Web3 = require("web3");
// const Transaction = require("ethereumjs-tx").Transaction;

const Transaction = require("../models/transaction");
const web3 = new Web3("https://ropsten.infura.io/v3/3c5dbe2ec25f46da984eb5951ca5b19a");


router.get("/userTransactionDetails", (req, res) => {
    Transaction.find().exec((err, result) => {
        if (err) {
            res.json(err);
        }

        res.json(result);
    });
});


router.get("/userTransactionDetails/:transactionId", (req, res) => {
    Transaction.findById(req.params.transactionId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            res.json(transaction);
        }
    });
});

router.post("/userTransactionDetails", (req, res) => {
    web3.eth.getTransaction("0x126ca78cc859ad6880703c59fc22ae0a588d894a647197cd05ccc3082c01808d")
        .then(transaction => {
            const newTransaction = new Transaction({
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
    Transaction.findById(req.params.userId).exec((err, transaction) => {
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
    Transaction.findById(req.params.userId).exec((err, transaction) => {
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
