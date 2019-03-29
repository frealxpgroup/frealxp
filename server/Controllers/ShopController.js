module.exports = {
  intial: (req, res) => {
    //for store front, will return all active products
    const db = req.app.get("db");
    db.shop.get_all_products().then(products => {
      res.status(200).send(products);
    });
  },
  addToCart: (req, res) => {
    // if  needed, create a cart - then add selected item to the cart.
    const db = req.app.get("db");
    const { cartRef, userID, productID } = req.body;
    db.shop
    .add_item_to_cart({ cartRef, userID, productID })
    .then(res.sendStatus(200));
  },
  incrementItem: (req, res) => {
    const db = req.app.get("db");
    const { cartID, newQty } = req.body;
    db.shop.increment_item({ cartID, newQty})
    .then(res.sendStatus(200));
  },
  getUserCart: (req, res) => {
    const { userID } = req.body;
    const db = req.app.get("db");

    db.shop.get_cart({ userID: userID }).then(cartArr => {
      if (cartArr.length < 1) {
        let refNum = 0;
        db.shop.get_last_cart_ref().then(refArr => {
          refNum = refArr[0].max + 1;
            db.shop.create_cart({ refNum: refNum, userID: userID }).then(cartArr => {
            res.status(200).send(cartArr);
            });
        });
      } else {
        res.status(200).send(cartArr);
      }
    });
  },
  changeQuantity: (req, res) => {
    //PUT request, edit cart item qty
    //get id from req.params
    //get updated quantity from req.body
  },
  checkoutFunction: (req, res) => {
    //PUT to cart, order history tables
  },
  deleteItem: (req, res) => {
    //delete all items from cart after purchase
  },
  getAddress: (req, res) => {
    //pull the user address if exists
  },
  editAddress: (req, res) => {
    //PUT user inputs their shipping & billing address if doesn't exist (edit null address that were generated in table when user was created)
  }
};
