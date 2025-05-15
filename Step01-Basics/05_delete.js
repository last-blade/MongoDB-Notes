/*
! deleteOne
--> yeh method single document ko delete karta hai collection mein se
Syntax:-> db.collection_name.deleteOne({which document to be delete, add that document identification, like id, etc})

~   db.students.deleteOne({_id: ObjectId("62235989834hehaiuiwe3044d")})
~   db.students.deleteOne({name: Akash})


! deleteMany
~   db.students.deleteMany({age: 18}); // jis jis student ki age 18 hogi woh sabhi ke sabhi delete ho jaayenge

--> agar "students" naam ki collection ke andar jistne bhi documents hain unn sabko delete karna hai, toh see below:
~   db.students.deleteMany({}); empty curly braces lagane hain bas, or saare documents delete ho jaayenge students collection ke.

*/