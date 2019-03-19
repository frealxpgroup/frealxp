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

create table if not exists challenges(
challenge_id serial primary key,
challenge_title varchar(40),
description text,
challenge_point_value int,
category varchar(30),
active boolean
);

create table if not exists tracker(
user_id int references users(user_id),
challenge_id int references challenges(challenge_id),
completion_date date,
approved_date date,
image text,
description varchar(200),
judge_feedback varchar(200)
);

create table if not exists prizes(
prize_id serial primary key,
name varchar(40),
prize_point_value int,
image text,
description varchar(200)
);

create table if not exists products(
product_id serial primary key,
product_name varchar(40),
product_description text,
price decimal,
active boolean,
product_image text
);

create table challenge_queue(
queue_id serial primary key,
user_id int references users(user_id),
challenge_id int references challenges(challenge_id)
);

create table if not exists cart(
cart_id serial primary key,
cart_ref int,
user_id int references users(user_id),
product_id int references products(product_id),
quantity int,
total decimal,
active boolean
);

