/*
! updateOne---------------------------------------------------------------
~   db.collection_name.updateOne(
~       {
~           field_name_in_document: "value of the field"
~       }, // yeh filter kar rahe hain hum yahan par collection ko
~       
~       {
~           $set: {updated_field: "new_value"} // yahan par update kar rahe hain
~       }
~   )

--> field name mein jaise ki filter kar sakte hain ki collection ke andar jo age 18 wala hai usko 24 kar do, see below:-

~   db.user.updateOne(
~       {
~           age: 18 // '_id' bhi de sakte hain yahan par jisko update karna hai
~       }, // yeh filter kar rahe hain hum yahan par
~       
~       {
~           $set: {age: 24} // yahan par update kar rahe hain
~       }
~   )

--> lekin oopar wale code mein jaise hi collection(user) ke andar usko sabse pehla document jo milega "age 18" wala, toh woh usko
    update kar dega or bas ek hi document update hoga


! updateMany---------------------------------------------------------------   

~   db.collection_name.updateMany(
~       {
~           field_name_in_document: "value of the field"
~       }, // yeh filter kar rahe hain hum yahan par
~       
~       {
~           $set: {updated_field: "new_value"} // yahan par update kar rahe hain
~       }
~   )

--> field name mein jaise ki filter kar sakte hain ki collection ke andar jitne bhi documnets mein age 18 hai hai usko 24 kar do, see below:-

~   db.user.updateMany(
~       {
~           age: 18
~       }, // yeh filter kar rahe hain hum yahan par
~       
~       {
~           $set: {age: 24} // yahan par update kar rahe hain
~       }
~   )
*/