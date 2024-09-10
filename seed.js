require('dotenv').config();
const {
  AccountModel,
  ProductModel,
  TransferModel,
  OrderModel,
} = require('./models');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await AccountModel.deleteMany();
    await ProductModel.deleteMany();
    await TransferModel.deleteMany();
    await OrderModel.deleteMany();

    // Create accounts
    const account1 = await AccountModel.create({ balance: 1000 });
    const account2 = await AccountModel.create({ balance: 500 });

    // Create products
    const product1 = await ProductModel.create({ name: 'Laptop', stock: 50 });
    const product2 = await ProductModel.create({
      name: 'Smartphone',
      stock: 100,
    });

    // Create a transfer
    await TransferModel.create({
      from: account1._id,
      to: account2._id,
      amount: 200,
    });

    // Create an order
    await OrderModel.create({
      productId: product1._id,
      quantity: 2,
    });

    console.log('Dummy data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
