const { Menu, Order, Customer, Checkout } = require('../models');
const nodeMailer = require('../helpers/nodeMailer');

class OrderController {

  static allMenuPage(req, res) {
    Menu.findAll()
      .then(menu => {
        res.render('pages/orders/order', { menu });
      })
      .catch(err => {
        res.send(err.message);
      })
  }

  static addMenu(req, res) {
    // Menambahkan data kedalam tabel customer,
    // agar IDnya bisa ditangkap
    let CustomerId;
    let TimeNow = new Date()
    Customer.create({
      name: req.body.CustomerName,
      phone: req.body.phone,
      email: req.body.email,
      createdAt: TimeNow
    })
      .then(() => {
        return Customer.findOne({
          where: {
            createdAt: TimeNow
          }
        })
      })
      .then(customer => {
        // Menangkap semua data yang datang dari 
        // form pesanan dan ID Customer yang baru ditambahkan
        CustomerId = customer.dataValues.id
        let MenuId = req.body.MenuId
        let qty = [];
        // Menghapus semua string kosong yang 
        // datang dari form pesanan
        for (let i = 0; i < req.body.qty.length; i++) {
          if (req.body.qty[i] !== '') {
            qty.push(req.body.qty[i])
          }
        }
        let data = [];
        for (let i = 0; i < MenuId.length; i++) {
          data.push({
            CustomerId: CustomerId,
            MenuId: MenuId[i],
            qty: qty[i]
          })
        }
        return Order.bulkCreate(data)
      })
      .then(orders => {
        res.redirect(`/order/receipt/${CustomerId}`)
      })
      .catch(err => {
        res.send(err.message);
      })
  }

  static receiptPage(req, res) {
    let CustomerId = req.params.id
    Customer.findOne({ where: { id: CustomerId }, include: Menu })
      .then(customer => {
        // res.send(customer)
        res.render('pages/orders/receipt', { customer })
      })
      .catch(err => {
        res.send(err.message);
      })
  }

  static editPage(req, res) {
    let CustomerId = req.query.CustomerId
    let MenuId = req.query.MenuId
    let qty = req.query.qty
    let MenuName = req.query.MenuName
    // res.send({CustomerId,MenuId,qty})
    res.render('pages/orders/editReceipt', { CustomerId, MenuId, qty, MenuName })
  }

  static edit(req, res) {
    Order.update({
      qty: req.body.qty
    }, {
      where: {
        CustomerId: req.body.CustomerId,
        MenuId: req.body.MenuId
      }
    })
      .then(() => {
        res.redirect(`/order/receipt/${req.body.CustomerId}`)
      })
      .catch(err => {
        res.send(err.message);
      })
  }

  static delete(req, res) {
    Order.destroy({
      where: {
        CustomerId: req.query.CustomerId,
        MenuId: req.query.MenuId
      }
    })
      .then(() => {
        // res.send('deleted')
        res.redirect(`/order/receipt/${req.query.CustomerId}`)
      })
      .catch(err => {
        res.send(err.message);
      })
  }

  static checkout(req, res) {
    let data = [];
    let totalSum;
    let customerData;
    if (typeof req.body.MenuId === 'string') {
      data.push({
        MenuId: req.body.MenuId,
        MenuName: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
        total: Number(req.body.price) * Number(req.body.qty),
        CustomerName: req.body.CustomerName,
        CustomerId: req.body.CustomerId
      })
    }
    else {
      for (let i = 0; i < req.body.MenuId.length; i++) {
        data.push({
          MenuId: req.body.MenuId[i],
          MenuName: req.body.name[i],
          price: req.body.price[i],
          qty: req.body.qty[i],
          total: Number(req.body.price[i]) * Number(req.body.qty[i]),
          CustomerName: req.body.CustomerName,
          CustomerId: req.body.CustomerId
        })
      }
    }
    Checkout.bulkCreate(data)
      .then(() => {
        return Checkout.sum('total', {
          where: {
            CustomerId: req.body.CustomerId
          }
        })
      })
      .then(sum => {
        totalSum = sum.toString()
        return Checkout.findAll({
          where: {
            CustomerId: req.body.CustomerId
          }
        })
      })
      .then(dataCheckout => {
        customerData = dataCheckout
        Order.destroy({
          where: {
            CustomerId: req.body.CustomerId
          }
        })
      })
      .then(() => {

        let sendToEmail = 'Nota Pembayaran \n';
        for (let i = 0; i < customerData.length; i++) {
          sendToEmail = sendToEmail + ' ' + customerData[i].dataValues.MenuName + ' ' + customerData[i].dataValues.total + '\n'
        }
        sendToEmail += 'Total belanjaan anda adalah : ' + totalSum;
        nodeMailer('dipadana@gmail.com', sendToEmail)

        res.render("pages/orders/invoice", { customerData, totalSum })
      })
      .catch(err => {
        console.log(err);

        res.send(err);

      })
  }

  static purchased(req, res) {
    res.render('pages/orders/purchased')
  }

}

module.exports = OrderController;