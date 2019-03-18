create table if not exists users(
user_id serial primary key,
first_name varchar(40),
last_name varchar(60),
email varchar(60),
password text,
judge boolean,
profile_picture text,
xp int
);

create table if not exists user_address(
user_id int references users(user_id),
shipping_line_one varchar(80),
shipping_line_two varchar(80),
shipping_city varchar(40),
shipping_state varchar(2),
shipping_zip int,
billing_line_one varchar(80),
billing_line_two varchar(80),
billing_city varchar(40),
billing_state varchar(2),
billing_zip int
);

