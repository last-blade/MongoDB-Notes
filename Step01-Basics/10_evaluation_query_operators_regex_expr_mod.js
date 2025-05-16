/*
! $regex
--> matches string fields to a pattern
~   {field: {$regex: /pattern/<options>}}

~   db.students.find(
~        {
~            name: {$regex: "tyagi", $options: "i"}
~        }
~    )


-->jiska naam capital "A" se shuru ho raha hai wahi return honge documents
~   db.students.find(
~        {
~            name: {$regex: "^A"}
~        }
~    )

-->jiske name ke end mein "th" aa raha hoga woh wale documents return ho jaayenge
~   db.students.find(
~        {
~            name: {$regex: "th$"} // $ lagana padta hai, yeh batata hai ki end wale letter ko find kar rahe hain i.e. "th" jahan last mein aata ho
~        }
~    )

! $expr
--> allows field comparisons within the document, like ek document ke andar 2 fields hain, 'budget and spent', toh hum inn dono
    fields ko compare kar sakte hain, or dekh sakte hain ki kis-kis user ne budget se zayada spend kara hai, toh jab bhi koi
    2 fields compare karne ho within the document, toh tab hum $expr operator kaa use karte hain.
~   {$expr: {<expression>}}

~   db.monthlyBudget.find({
~       $expr: {$gt: ["$spend", "$budget"]}
~   })

! $mod
-->matches numbers based on remainder
~   {field: {$mod: [divisor, remainder]}}
~   {age: {$mod: [2, 0]}}; // age ko divide karenge 2 se, or jahan jahan par remainder 0 aa raha hai woh wale documents return ho jaayenge

! $jsonSchema
--> validate documents against the given JSON schema
*/