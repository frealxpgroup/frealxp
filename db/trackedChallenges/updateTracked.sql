update tracker 
set completion_date = $1, image = $2, description = $3
where user_id = $4 and challenge_id = $5 and completion_date is null;