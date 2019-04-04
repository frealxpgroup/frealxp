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
        const { user_id, id, challenge_title } = req.body
        const db = req.app.get('db');
        const acceptedChallenge = await db.trackedChallenges.addTracked({ user: user_id, challenge: id, challengeTitle: challenge_title })
        
        res.status(200).send(acceptedChallenge)

    },
    getUserChallengeDate: async (req, res) => {
        
        const  {user_id}  = req.body
        
        const db = req.app.get('db');
        const idBoth = await db.trackedChallenges.getOneTracked([user_id])
        

        res.status(200).send(idBoth)
    },
    getAllChallengeDates: async (req, res) => {
        const db = req.app.get('db')
        const allDates = await db.trackedChallenges.getAllDates()
        
        res.status(200).send(allDates)
        
    },
    getApproved: (req, res) => {
        //For User History
    },
    submitChallenge: async (req, res) => {
        //POST user submission
        //get data from req.body (like the challenge title, picture, user, etc)
        const db = req.app.get('db')
        const {description, startDate, user_id, url, challengeID} = req.body
        const updatedChallenge = await db.trackedChallenges.updateTracked([startDate, url, description, user_id, challengeID])

        res.status(200).send(updatedChallenge)


    },
    submitOneChallenge:(req,res) => {
        const db = req.app.get('db')
        
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