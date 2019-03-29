update user_address
set shipping_line_one = ${shipping_line_one}, shipping_line_two = ${shipping_line_two}, shipping_city = ${shipping_city}, shipping_state = ${shipping_state}, shipping_zip = ${shipping_zip}
where user_id = ${user_id};