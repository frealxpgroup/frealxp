insert into products(
product_name, product_description, price, active, product_image
) values (
'My Axe!', 'Great for telling people you are willing to help them out.', 500.00, true, 'https://www.theknightshop.com/media/catalog/product/cache/1/image/650x/20ceae97ced72d6d88191c5b20b1646f/n/n/nn2222.jpg'
);

insert into products(
product_name, product_description, price, active, product_image
) values ('Ring of Power', 'Use with caution', 3000.00, true, 'https://mises-media.s3.amazonaws.com/styles/slideshow/s3/static-page/img/lord_of_the_rings_ring.png?itok=-QBu-xTp'
);

insert into products(
product_name, product_description, price, active, product_image
) values(
'Adventure Cloak', 'Can avoid detection from enemies in dorky helmets', 75.00, true, 'https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiVmYSiz47hAhVlGH0KHVikBWYYABABGgJwdg&ohost=www.google.com&cid=CAESEeD2-6mZQbtNgljD9c7hKV7u&sig=AOD64_1zc-hKyWeWMlZ7fwX0JuwQFyDn6w&ctype=5&q=&ved=0ahUKEwj9m_6hz47hAhVJHDQIHWh0CT0Q9aACCDU&adurl='
);

insert into prizes(name, prize_point_value, image, description)
values(
'T-shirt',
10,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtWXsD7Mlzoiq1IJcFlOyMicS4aJKOaH7UaGQ1lsOoM_BmoTTu',
'FrealXP T-shirt'
);

insert into prizes(name, prize_point_value, image, description)
values(
'Beanie',
50,
'https://s3.amazonaws.com/stockx-sneaker-analysis/wp-content/uploads/2018/11/Supreme-New-Era-Box-Logo-Beanie-FW18-Heather-Grey.jpg',
'FrealXP Beanie'
);

insert into prizes(name, prize_point_value, image, description)
values(
'Ball-cap',
75,
'https://epicsports.cachefly.net/images/122398/300/sweet-caps-twill-mesh-adjustable-trucker-hats.jpg',
'FrealXP Ball Cap'
);

insert into prizes(name, prize_point_value, image, description)
values(
'Hoodie',
100,
'https://tyr-media.s3.amazonaws.com/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msph3a-001_alt01_1.jpg',
'FrealXP Hoodie'
);

insert into prizes(name, prize_point_value, image, description)
values(
'Sunglasses',
200,
'https://cdn.shopify.com/s/files/1/0677/4111/products/BK-GR10P_800x800_01_800x.jpg?v=1547746764',
'Super awesome sunglasses'
);

insert into prizes(name, prize_point_value, image, description)
values(
'GoPro Camera',
300,
'https://cnet1.cbsistatic.com/img/vyb9c2QPByn26cP1_ubSS3aYgEE=/830x467/2016/09/20/4805223d-05ef-4de5-aa68-6a51e0524736/gopro-hero5-preview-black-01.jpg',
'Go-Pro Camera - it is super rad'
);

insert into prizes(name, prize_point_value, image, description)
values(
'Tent',
500,
'https://www.rei.com/media/product/130893',
'Totally rad tent'
);

insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Backpacking', 'Go backpacking into the mountains', 15, 'Outdoors', false)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Horseback riding', 'Ride a horse', 15, 'Outdoors', false)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Camping', 'A red sun rises', 25, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Cooking', 'Boil em, Mash em, Stick em in stew', 10, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Cave Exploration', 'Explore a cave...maybe find some ghosts that owe you a favor...or a Balrog.', 20, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Fishing', 'Catch a couple of fish)', 10, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Gardening', 'Planting through harvest, take picture of said harvest”)', 50, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Axe Throwing', 'Learn to axe throw!”)', 10, 'New Skill', true)    
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Toast Master', 'Learn public speaking skills. Give an epic speech to motivate your team (“There may be a day when the courage of man may fail,...but it is not this day!”)', 20, 'New Skill', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Archery', 'Learn how to shoot a bow and arrow', 10, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Go Canoeing', 'Rent a canoe and take it out into a body of water', 10, 'Outdoors', true)
insert into challenges(challenge_title, description, challenge_point_value, category, active)
values('Climb a Mountain', 'Hike or climb up a big rock - the bigger the better!!', 35, 'Outdoors', true);

insert into users(first_name, last_name, email, password, judge, xp)
values 
('Gandalf', 'The Grey', 'wielderoftheFlameofAnor@midearth.com', 'shadowfax', true, 200),
('Aragorn', 'Elessar', 'rangerofthenorth@midearth.com', 'isildursbane', false, 0),
('Frodo', 'Baggins', 'ringbearer@midearth.com', 'iloveeagles', false, 0)
('Legolas', 'Greenleaf', 'takingthehobbits@midearth.com', '2isengard', false, 0),
('Gimli', 'Son of Gloin', 'axeaboutme@midearth.com', 'elvesareokay', false, 0);
