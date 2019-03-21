module.exports = {
    getInitial: (req, res) => {
        //User XP on dashboard. get user login info from req.body
    }, 
    getAllChallenges: (req, res) => {
        //For Challenges page
    },
    getOneChallenge: (req, res) => {
        //For Modal.  use sql logic to pull specific data for that user
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