update user_address
set shipping_line_one = ${shipping_line_one}, shipping_line_two = ${shipping_line_two}, shipping_city = ${shipping_city}, shipping_state = ${shipping_state}, shipping_zip = ${shipping_zip},
billing_line_one = ${billing_line_one}, billing_line_two = ${billing_line_two}, billing_city = ${billing_city}, billing_state = ${billing_state}, billing_zip = ${billing_zip}
where user_id = ${user_id};