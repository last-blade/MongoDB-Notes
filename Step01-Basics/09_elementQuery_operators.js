/*
! $exists
--> matches documents that have specified field
~   {field: {$exists: <boolean_value>}}
yeh operator ussi field wale document ko fetch karega jisko hum search kar rahe hain(boolean value agar "true" hogi tabhi, agar
false hogi toh fir jo field search kar rahe hain usse chhodkar baaki ke documents show karega jismein yeh field exist hi nahin karta)

~   db.students.find(
~       {
~           name: {$exists: true}
~       }
~   )


! $type
--> selects documents if a field is of the specified type
~   {field: {$type: <type>}}
yeh basically data-types search karta hai, like age wale field ko show karo jismein integer value stored hai, halaki jab model define
karte hain tab hum datatype bhi mention kar dete hain or uske alawa koi datatype store hoga hi nahin

~   db.students.find({age: {$type: "int"}})
^ multiple values bhi search kar sakte hain
~   db.students.find({age: {$type: ["int", "string", "array"]}})
*/