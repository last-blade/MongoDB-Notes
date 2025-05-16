/*
! findOneAndUpdate();
--> yeh function pehle document ko find karta hai or fir update karta hai, and then updated document ko return kar deta hai as response
~   db.colleciton_name.findOneAndUpdate(
~       {field-name: "field-value"},
~       {$set: {updated_field: "new_value"}},
~       {options}
~   )

--> 'options' jo hai oopar code mein, usmein hum 4 options rakh sakte hain
1. projection: kaunse fields dikhane hain or kaunse nahin dikhane jab document return hoga, uss kaam aata hai projection
2. returnDocument: "after" / "before"; ismein 'after' jo hai document update hone ke baad updated document return karta hai, and "before" wala purana wala document send karta hai update hone se pehle wala.
3. sort: 1/-1; ismein 1 kaa matlab ascending and -1 kaa matlab descending order
4. upsert: It is a single operation that either updates an existing document or inserts a new one if no matching document is found. 
            it takes true/false value, agar 'upsert: true' hai toh document nahin milega toh create ho jaayega

~   db.students.findOneAndUpdate(
~       {name: "Prashant"},
~       {$set: {age: 18}},
~       {returnDocument: "after"} // iske andar hum 1 se zyada options bhi daal sakte hain oopar jo bataye hain 4 options.
~   )            


--------------------------------------------------------------------------

~   db.students.findOneAndUpdate(
~       {name: "Prashant"},
~       {$set: {age: 18}},
~       {
~            returnDocument: "after",
~            projection: {name: 1, age: 1, _id: 0} // name and age show hoga response mein kewal
~        } //multiple options add kar diye yahan par ab
~   ) 

----------------------------------------------------------------------------

~   db.students.findOneAndUpdate(
~       {name: "Prashant"},
~       {$set: {age: 18, class: "PHD"}},
~       {
~           upsert: true 
~       }
~   ) 
^ -->jab oopar wala document nahin milega database mein, toh fir oopar wala document create ho jaayega, since humne "upsert: true"
likha hai option mein

----------------------------------------------------------------------------

~   db.students.findOneAndUpdate(
~       {name: "Prashant"},
~       {$set: {age: 18}},
~       {
~           sort: {age: 1} 
~       }
~   ) 

! findOneAndReplace();
~   db.students.findOneAndReplace(
~       {name: "Prashant"},
~       {age: 18, name: "SRK", class: "PHD"}, // yahan par saare fields daalne hain jo replce karna hai document 
~       {
~           returnDocument: "after" 
~       }
~   ) 

! findOneAndDelete();
~   db.students.findOneAndDelete(
~       {name: "Akash"},

~       {
~           sort: {age: 1} 
~       }
~   ) 

-->jis "Akash" student ki age sabse chhoti hai, woh delete ho jaayega, kyoki humne 'sort' lagaya hai, i.e. pehle saare ke saare
    "Akash" naam wale students "age" ke according ascending order mein sort honge, and the top par sabse chhoti age wala "Akash"
    aa jaayega or fir woh delete ho jaayega.
    Agar "sort: -1" hota toh fir descending order mein sort honge Akash naam wale students "age" ke context mein or fir jiski sabse
    zyada age hoti woh delete ho jaata
*/