const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const Transaction = require("ethereumjs-tx").Transaction;

const User = require("../models/user");
const web3 = new Web3("https://ropsten.infura.io/v3/3c5dbe2ec25f46da984eb5951ca5b19a");


router.get("/userTransactionDetails/:userId", (req, res) => {
    User.findById(req.params.userId).exec((err, user) => {
        if (err) {
            res.json(err);
        }

        if (user != null) {
            web3.eth.getTransactionReceipt(user.transactionId)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });
});

router.post("/userTransactionDetails", (req, res) => {
    web3.eth.getTransaction("0x126ca78cc859ad6880703c59fc22ae0a588d894a647197cd05ccc3082c01808d")
        .then(transaction => {
            const newUser = new User({
                transactionId: transaction.hash,
                sendAddress: transaction.from,
                receiveAddress: transaction.to,
                amount: transaction.value
            });

            newUser.save();

            res.json(newUser);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
