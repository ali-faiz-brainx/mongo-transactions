const { AccountModel, TransferModel } = require('../models');
const mongoose = require('mongoose');

exports.transferNoTransaction = async (req, res) => {
  try {
    const { fromId, toId, amount } = req.body;

    const fromAccount = await AccountModel.findById(fromId);
    if (fromAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    await AccountModel.updateOne(
      { _id: fromId },
      { $inc: { balance: -amount } }
    );
    // throw 'Test error';
    await AccountModel.updateOne({ _id: toId }, { $inc: { balance: amount } });
    await TransferModel.create({ from: fromId, to: toId, amount });

    return res.json({ message: 'Transfer successful' });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: 'Transfer failed' });
  }
};

exports.transferWithTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { fromId, toId, amount } = req.body;

    const fromAccount = await AccountModel.findById(fromId).session(session);
    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds');
    }

    await AccountModel.updateOne(
      { _id: fromId },
      { $inc: { balance: -amount } }
    ).session(session);
    // throw 'Error';
    await AccountModel.updateOne(
      { _id: toId },
      { $inc: { balance: amount } }
    ).session(session);
    await TransferModel.create([{ from: fromId, to: toId, amount }], {
      session,
    });

    await session.commitTransaction();
    res.json({ message: 'Transfer successful' });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    res.status(500).json({ error: 'Transfer failed' });
  } finally {
    session.endSession();
  }
};
