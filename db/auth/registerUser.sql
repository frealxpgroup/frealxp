insert into users(first_name, last_name, email, password, judge, xp)
values 
(${first_name}, ${last_name}, ${email}, ${password}, false, 0)
returning email, first_name, last_name;