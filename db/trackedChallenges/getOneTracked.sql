select approved_date from tracker
where user_id = ${user} and challenge_id in 
(select challenge_id from tracker where user_id = ${user})


