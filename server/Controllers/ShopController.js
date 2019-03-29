module.exports = {
    intial: (req, res) => {
        //for store front, will return all active products
        const db = req.app.get("db");
        db.shop.get_all_products()
            .then(products => {
                res.status(200).send(products)
            })
    },
    addToCart: (req, res) => {
        // if  needed, create a cart - then add selected item to the cart.
        const db = req.app.get('db');
        const { cartRef, userID, productID } = req.body
        db.shop.add_item_to_cart({ cartRef, userID, productID })
            .then(res.sendStatus(200))
    },
    getUserCart: (req, res) => {
        //Based on user ID
        const { userID } = req.body;
        console.log(req.body)
        const db = req.app.get('db');
        db.shop.get_cart({ userID: userID })
            .then(cartArr => {
                res.status(200).send(cartArr)
            })
    },
    changeQuantity: (req, res) => {
        //PUT request, edit cart item qty
        //get id from req.params
        //get updated quantity from req.body
    },
    checkoutFunction: (req, res) => {
        //PUT to cart, order history tables
        //
    },
    deleteItem: (req, res) => {
        //delete all items from cart after purchase
    },
    getAddress: async (req, res) => {
        const { user_id } = req.body
        const db = req.app.get('db')
        let address = await db.shop.get_address({ user_id: user_id })
        address = address[0]
        res.status(200).send(address)
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
        } = req.body

        const db = req.app.get('db')
        let address = await db.shop.update_address({
            shipping_line_one: shipAddress1, 
            shipping_line_two: shipAddress2, 
            shipping_city : shipCity, 
            shipping_state: shipState, 
            shipping_zip: shipZip,
            billing_line_one: billAddress1,
            billing_line_two: billAddress2,
            billing_city: billCity,
            billing_state: billState,
            billing_zip: billZip,
            user_id: user_id
        })

        address = address[0]
        res.sendStatus(200)
    }
}

