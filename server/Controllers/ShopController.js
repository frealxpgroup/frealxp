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
      .then(() => {db.shop.delete_null()})
      .then(res.sendStatus(200))
      
  },
  changeQuantity: (req, res) => {
    const db = req.app.get("db");
    const { foundCartID, newQty } = req.body;
    db.shop.change_quantity({ foundCartID, newQty })
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
          db.shop
            .create_cart({ refNum: refNum, userID: userID })
            .then(cartArr => {
              res.status(200).send(cartArr);
            });
        });
      } else {
        res.status(200).send(cartArr);
      }
    });
  },
  deleteItem: (req, res) => {
    const {cartID} = req.params
    const db = req.app.get("db");
    db.shop.delete_cart_item({cartID})
    .then(res.sendStatus(200))
  },
  deleteCart: (req, res) => {
    const {cartRef} = req.params
    const db = req.app.get("db");
    db.shop.delete_cart({cartRef})
    .then(res.sendStatus(200))
  },
  getAddress: async (req, res) => {
    const { user_id } = req.body;
    const db = req.app.get("db");
    let address = await db.shop.get_address({ user_id: user_id });
    address = address[0];
    res.status(200).send(address);
  },
  editAddress: async (req, res) => {
    const {
      shipAddress1,
      shipAddress2,
      shipCity,
      shipState,
      shipZip,
      billAddress1,
      billAddress2,
      billCity,
      billState,
      billZip,
      user_id
    } = req.body;

    const db = req.app.get("db");
    let address = await db.shop.update_address({
      shipping_line_one: shipAddress1,
      shipping_line_two: shipAddress2,
      shipping_city: shipCity,
      shipping_state: shipState,
      shipping_zip: shipZip,
      billing_line_one: billAddress1,
      billing_line_two: billAddress2,
      billing_city: billCity,
      billing_state: billState,
      billing_zip: billZip,
      user_id: user_id
    });

    address = address[0];
    res.sendStatus(200);
  }
};
