insert into cart( cart_ref, user_id, product_id, quantity, total, active)
values( ${refNum}, ${userID}, null, null, 0, true)
returning *
;