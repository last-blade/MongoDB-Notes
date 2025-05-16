/*
! $eq
--> equals to
~   {"age": {$eq: 20}} // jis jis ki age 20 hogi woh documents fetch ho jaayenge

~   db.students.find({age: {$eq: 20}});

^ example:-
db.students.updateMany(
    {
        age: {$eq: 20}
    },

    {
        $set: {class: "12th"}
    }
)
^ jiski age 20 ke barabar hai uski class 12th kardo, toh aise hi kuch usecases hain, jo ki hum neeche operators par bhi use kar sakte hain.

db.students.deleteMany(
    {
        age: {$eq: 17}
    }
)

^ jiski age 17 ke equal hogi woh saare documents delete ho jaayenge, aise hi read, delete, update, sab operation mein use kar sakte hain inn operators ko


! $ne
--> not equals to
~   {"age": {$ne: 20}} // jis jis ki age 20 ke barabar nahin hogi woh documents fetch ho jaayenge

~   db.students.find({age: {$ne: 20}});


! $gt
--> greater than
~   {"age": {$gt: 20}} // jis jis ki age 20 se zyada hogi woh documents fetch ho jaayenge

~   db.students.find({age: {$gt: 20}});

! $gte
--> greater than equals to
~   {"age": {$gte: 20}} // jis jis ki age 20 yaa usse zyada hogi woh documents fetch ho jaayenge

~   db.students.find({age: {$gte: 20}});

! $lt
--> less than
~   {"age": {$lt: 20}} // jis jis ki age 20 se kam hogi woh documents fetch ho jaayenge

~   db.students.find({age: {$lt: 20}});

! $lte
--> less than equals to
~   {"age": {$lte: 20}} // jis jis ki age 20 yaa 20 se kam hogi woh documents fetch ho jaayenge

~   db.students.find({age: {$lte: 20}});

! $in
--> value is matched within an array
~ {"age": {$in: [20, 24, 30]}} // jis jis ki age 20, 24, 30 hogi woh users hi fetch honge

~   db.students.find({age: {$in: [20, 24, 30]}});

! $nin
--> value is not match within an array
~ {"age": {$nin: [20, 24]}} // jis jis ki age 20, 24 nahin hai woh wale documents fetch honge kewal

~   db.students.find({age: {$nin: [20, 24]}});
*/