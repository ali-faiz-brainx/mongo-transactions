const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const inventoryController = require('../controllers/inventoryController');

router.post(
  '/transfer-no-transaction',
  accountController.transferNoTransaction
);
router.post(
  '/transfer-with-transaction',
  accountController.transferWithTransaction
);
router.post('/order-no-transaction', inventoryController.orderNoTransaction);
router.post(
  '/order-with-transaction',
  inventoryController.orderWithTransaction
);

module.exports = router;
