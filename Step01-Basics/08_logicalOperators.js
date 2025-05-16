/*
! $and
--> return documents where both queries match
~   {$and: [condition1, condition2]}

~   db.students.find(
~        {
~            $and: [
~                {age: {$gt: 20}},
~                {class: {$eq: "12th"}},
~            ]
~        }
~    )
jab oopar ki dono condition match hongi tabhi documents fetch honge, jiski age greater than 20 hogi and class 12th hogi     

! $or
--> returns documents where either query matches
~   {$or : [condition1, condition2]}
opposite of "$and" operator

! $nor
--> returns documents where both queries fail to match
~   {$nor: [condition1, condition2]}

~   db.students.find(
~        {
~            $nor: [
~                {age: {$gt: 20}},
~                {class: {$eq: "12th"}},
~            ]
~        }
~    )

jiski age 20 se kam hogi or class 12th nahin hogi, woh wale documents return honge, matlab ki jo condition daalte hain 
uska ulta kar deta hai yeh operator "$nor"

! $not
--> returns documents where the query does not match
~   {$not: [condition]}
*/