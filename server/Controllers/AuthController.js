const bcrypt = require('bcryptjs')

module.exports = {
    register: (req, res) => {
        //get user login info from req.body
    },
    login: (req, res) => {
        //get user login info from req.body
    },
    logout: (req, res) => {
        //destroy the session!!!!!!!!!!!!!
    },  
    editAuth: (req, res) => {
        //get id from req.params
        //get updated user profile info from req.body
    }
}