const express = require("express");
const router = express.Router();
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io/");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io/");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io/");
const privateKey = process.env.TRON_PRIVATE_KEY;
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const Tron_Transaction = require("../models/tron_transaction");

router.get("/userTransactionDetails", (req, res) => {
    Tron_Transaction.find().exec((err, result) => {
        if (err) {
            res.json(err);
        }

        res.json(result);
    });
});

router.post("/userTransactionDetails", (req, res) => {
    tronWeb.trx.getTransaction("0243b4e347608e21e7c48cb74c59eb40ce0b2115e3b7fdcbcff34051b3ca4851")
        .then(transaction => {
            console.log(transaction.raw_data.contract[0].parameter.value);

            const newTronTransaction = new Tron_Transaction({
                transactionId: transaction.txID,
                sendAddress: transaction.raw_data.contract[0].parameter.value.owner_address,
                receiveAddress: transaction.raw_data.contract[0].parameter.value.to_address,
                amount: transaction.raw_data.contract[0].parameter.value.amount
            });

            newTronTransaction.save();

            res.json(newTronTransaction);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/userTransactionDetails/:userId", (req, res) => {
    Tron_Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            res.json(transaction);
        }
    });
});


router.get("/userTransactionDetails/:userId/receiveAddressBalance", (req, res) => {
    Tron_Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            tronWeb.trx.getBalance(transaction.receiveAddress)
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
    Tron_Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }

        if (transaction != null) {
            tronWeb.trx.getBalance(transaction.sendAddress)
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