const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { email, password, firstName, lastName } = req.body
        const { session } = req
        let db = req.app.get('db')

        let checkUser = await db.auth.getUserByEmail({ email: email })
        checkUser = checkUser[0]

        if (checkUser) {
            return res.status(409).send('User already exists. Please enter a new email address')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.auth.registerUser({ email, password: hash, first_name: firstName, last_name: lastName })
        newUser = newUser[0]

        session.user = { ...newUser }
        console.log(session)
        res.status(200).send(session.user)
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const { session } = req

        let db = req.app.get('db')

        let user = await db.auth.getUserByEmail({ email: email })
        user = user[0]

        if (!user) {
            return res.status(401).send('Invalid Email')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.password)
        console.log('Authentication happened?', isAuthenticated)
        if (!isAuthenticated) {
            return res.status(401).send('Invalid login credentials.  Please try again')
        }

        delete user.password

        session.user = user
        console.log(session.user)
        res.status(200).send(session.user)

    },
    logout: (req, res) => {
        req.session.destroy()
        console.log(req.session)
        res.sendStatus(200)
    },
    editAuth: (req, res) => {
        //get id from req.params
        //get updated user profile info from req.body
    },
    getXP: (req, res) => {
        let db = req.app.get('db')
            db.auth.getXPFromUser()
            .then(XP => res.status(200).send(XP))
            .catch(err => {
                res.status(500).send({ errorMessage: 'Mistakes were made.' })
            })

    },
    getAllUserIDs: async (req, res) => {
        let db = req.app.get('db')
       const allUsers = await db.auth.getAllUserIDs()
       console.log(allUsers)
       res.status(200).send(allUsers)
    }
}