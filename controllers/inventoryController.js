const mongoose = require('mongoose');
const { ProductModel, OrderModel } = require('../models');

exports.orderNoTransaction = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (product?.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    await ProductModel.updateOne(
      { _id: productId },
      { $inc: { stock: -quantity } }
    );

    // throw 'error';

    await OrderModel.create({ productId, quantity });

    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Order failed' });
  }
};

exports.orderWithTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId).session(session);
    if (product.stock < quantity) {
      throw new Error('Not enough stock');
    }

    await ProductModel.updateOne(
      { _id: productId },
      { $inc: { stock: -quantity } }
    ).session(session);

    // throw 'error';
    await OrderModel.create([{ productId, quantity }], { session });

    await session.commitTransaction();
    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Order failed' });
  } finally {
    session.endSession();
  }
};
