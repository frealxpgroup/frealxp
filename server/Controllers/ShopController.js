module.exports = {
    getAllProducts: (req, res) => {
        //for store front
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
        //
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

