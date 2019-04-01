update users
set first_name = ${first_name}, last_name = ${last_name}, email = ${email}
where user_id = ${user_id};