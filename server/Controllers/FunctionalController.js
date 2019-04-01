module.exports = {
    getInitial: (req, res) => {
        //User XP on dashboard. get user login info from req.body
    },
    getAllChallenges: (req, res) => {
        const db = req.app.get('db');
        db.challenges.getAllChallenges()
            .then(challenges => res.status(200).send(challenges))
            .catch(err => {
                res.status(500).send({ errorMessage: 'Mistakes were made.' })
            })
    },
    getOneChallenge: async (req, res) => {

        const { challengeInput } = req.body

        const db = req.app.get('db');
        const oneChallenge = await db.challenges.getOneChallenge({ category: challengeInput })


        res.status(200).send(oneChallenge)

    },
    challengeAccepted: async (req, res) => {
        const { user_id, id } = req.body
        const db = req.app.get('db');
        const acceptedChallenge = await db.trackedChallenges.addTracked({ user: user_id, challenge: id })
        res.status(200).send(acceptedChallenge)

    },
    getUserChallengeDate: async (req, res) => {
        console.log(req.body)
        const  {user_id}  = req.body
        console.log(user_id)
        const db = req.app.get('db');
        const idBoth = await db.trackedChallenges.getOneTracked([user_id])
        console.log('idBoth', idBoth)

        res.status(200).send(idBoth)
    },
    getAllChallengeDates: async (req, res) => {
        const db = req.app.get('db')
        const allDates = await db.trackedChallenges.getAllDates()
        console.log(allDates)
        res.status(200).send(allDates)
        
    },
    getApproved: (req, res) => {
        //For User History
    },
    submitChallenge: (req, res) => {
        //POST user submission
        //get data from req.body (like the challenge title, picture, user, etc)
    },
    reviewChallenge: (req, res) => {
        //PUT request, allows judges to approve or deny submissions
        //get id from req.params
        //get review input data from req.body
    },
    getPrizes: (req, res) => {
        //display all prizes
    },
}