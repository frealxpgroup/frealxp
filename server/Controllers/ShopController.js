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
        console.log(req.body)
    },
    getUserCart: (req, res) => {
        //Based on user ID
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
}