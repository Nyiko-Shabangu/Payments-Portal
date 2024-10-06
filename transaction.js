const express = require('express');
const Transaction = require('../models/Transaction'); // Assuming Transaction model is in ../models/Transaction.js
const router = express.Router();

// Create a new transaction (Customer creating a transaction)
router.post('/create', async (req, res) => {
    const { amount, currency, provider, accountnumber, swiftcode } = req.body;

    try {
        const transaction = new Transaction({
            amount,
            currency,
            provider,
            accountnumber,
            swiftcode
        });

        await transaction.save();
        res.status(201).json({ msg: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Get all transactions (Admin/Employee can view all transactions)
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Get transaction by ID (Admin/Employee or Customer can view a specific transaction)
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Update a transaction (Used by employees to verify or update transaction details)
router.put('/:id', async (req, res) => {
    const { amount, currency, provider, accountnumber, swiftcode } = req.body;

    try {
        let transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        // Update transaction details
        transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { amount, currency, provider, accountnumber, swiftcode },
            { new: true }
        );

        res.status(200).json({ msg: 'Transaction updated successfully', transaction });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Delete a transaction (Admin can delete a transaction if necessary)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        await transaction.remove();
        res.status(200).json({ msg: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Verify and submit a transaction to SWIFT (Employee forwards the transaction to SWIFT for processing)
router.post('/verify/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        // Simulate the transaction being verified and sent to SWIFT
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        // integrate with the SWIFT API here

        const decoded = jwt.verify(token, 'yourSecretKey');
        const employeeId = decoded.employeeId;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(401).json({ msg: 'Employee not found' });
        }

        transaction.verified = true;
        await transaction.save();

        res.status(200).json({ msg: 'Transaction verified and forwarded to SWIFT', transaction });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
