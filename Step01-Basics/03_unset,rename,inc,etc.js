/* 
! $unset:
--> yeh basically remove kar deta hai kisi particular field ko, like mujhe kisi document mein se "age" wale field ko 
    remove karna hai, toh usko permanent delete kar sakte hain.
    ~   db.students.updateOne(
    ~       {_id:  ObjectId('6824c06d69c19216f06c4bda')}, 

    ~       {
    ~           $unset: {age: ""} // 'age' field remove ho jaayega jiski bhi user ki "_id" match hogi database mein. 
    ~       }
    ~   )

! $set
--> yeh basically new field ko insert kar deta hai kisi bhi particular document ke andar yaa fir sabhi ke liye updateMany laga sakte hain
    ~    db.students.updateMany(
    ~           {},
    
    ~           {
    ~           $set: {
    ~               skills: ["Javascript", "Expressjs", "Nodejs"]; // "saare jitne bhi documents hain "schools" collection ke andar, unn sab mein skill 
    ~           }
    ~       }
    ~   )


! $rename
--> ismein basically hum document mein kisi field ko rename kar sakte hain, jaise ki "coding" field ki jagah "codingSkills" 
    likhna hai, toh tab yeh kaam aata hai
    ~   db.students.updateOne(
    ~       {_id:  ObjectId('6824c06d69c19216f06c4bda')}, 

    ~       {
    ~           $rename: {skills: "codingSkills"} // 'skills' field rename ho jaayega or 'codingSkills' ho jaayega. 
    ~       }
    ~   )
    
! $inc
--> ismein basocally hum kisi bhi field ki value ko increment kara sakte hain, like jahan par age: 18 likhi hai wahan par
    age: 19 kardo, toh aisi jagah par yeh wala operator kaam aata hai
    ~   db.students.updateOne(
    ~       {_id:  ObjectId('6824c06d69c19216f06c4bda')}, 

    ~       {
    ~           $inc: {age: 2} // 'age' mein +2 ho jaayega, agar kisi ki age 22 hogi toh 24 ho jaayegi age. 
    ~       }
    ~   )
 
! $mul
--> iss operator ki help se hum kisi bhi field ki value ko multiply kar sakte hain
    ~   db.students.updateOne(
    ~       {_id:  ObjectId('6824c06d69c19216f06c4bda')}, 

    ~       {
    ~           $mul: {age: 2} // 'age' mein 2x ho jaayega, agar kisi ki age 18 hogi toh 36 ho jaayegi age. 
    ~       }
    ~   )

! $currentDate
--> sets the field value to the current date
    ~   db.students.updateMany(
    ~       {}, empty rakhenge isko, isse fir saare documents jo hain collection mein woh sab select ho jaayenge

    ~       {
    ~           $currentDate: {"lastModified": true} // 'lastModified' field mein present date insert ho jaayegi, agar 'lastModified' field hai hi nahin, toh fir 'lastModified' wala field create ho jaayega or usmein present date insert ho jaayegi. 
    ~       }
    ~   )

! $min
    ~   db.students.updateOne(
    ~       {name: "Prashant"},

    ~       {
    ~           $min: {age: "20"} // 20 age agar kam hai existing one se, toh fir age 20 set ho jaayegi jiska naam "Prashant" hoga i.e., suppose "prashant" naam ke user ki age 24 hai document mein, $min dekhega ki 20 jo hai 24 se kam hai ki nahin, agar 20 value kam hai 24 se toh fir update ho jaayegi age 24 se 20 ho jaayegi age  
    ~       }
    ~   )

! $max  
    ~   db.students.updateOne(
    ~       {name: "Prashant"},

    ~       {
    ~           $max: {age: "20"} // opposite of $min operator 
    ~       }
    ~   )  

!updateMany:- karne ke liye, see below code
    ~   db.students.updateMany(
    ~       {}, empty rakhenge isko, isse fir saare documents jo hain collection mein woh sab select ho jaayenge

    ~       {
    ~           $rename: {phone: "contact"} // 'phone' field rename hokar "contact" ho jaayega saare documents mein. 
    ~       }
    ~   )
!  aise hi saare oopar wale operators mein apply kar sakte hain 'updateMany' ko, oopar code mein sirf $rename operator kaa example hi diya hai.
^---------------------------Agar array par operation perform karne hain toh uske liye alag operators hote hain--------------------------------

{
    skills: ["HTML", "C++", "Javascript", "Nodejs"]
}

! $push
--> yeh operator element add karne ke liye use hota hai, agar mujhe ooapr wali array mein "Reactjs" add karni hai toh iss operator kaa use karenge'
    ~   db.students.updateOne(
    ~       {_id: ObjectId('6271319283aedcdlreh023')},

    ~       {
    ~           $push: {skills: "Reactjs"} // oopar jo array hai "skills" naam se, usmein "Reactjs" element add ho jaayega 
    ~       }
    ~   )

! $pop
--> removes the last or first element of the array
    ~   db.students.updateOne(
    ~       {_id: ObjectId('6271319283aedcdlreh023')},

    ~       {
    ~           $pop: {skills: 1} // oopar jo array hai "skills" naam se, usmein last element delete ho jaayega, agar -1 hota toh first element delete hoga "1" for last element and "-1" for first element
    ~       }
    ~   )

! $pull
--> isse hum koi bhi particular element remove kar sakte hain array mein se
    ~   db.students.updateOne(
    ~       {_id: ObjectId('6271319283aedcdlreh023')},

    ~       {
    ~           $pull: {skills: "C++"} // oopar jo array hai "skills" naam se, usmein se "Javascript" element delete ho jaayega
    ~       }
    ~   )

! $pullAll    
--> Agar multiple elements remove karne hain array mein se, toh fir, $pullAll operator kaa use karenge
    ~   db.students.updateOne(
    ~       {_id: ObjectId('6271319283aedcdlreh023')},

    ~       {
    ~           $pullAll: {skills: ["C++", "Nodejs"]} // oopar jo array hai "skills" naam se, usmein se "Nodejs and C++" elements delete ho jaayegenge
    ~       }
    ~   )

! $addToSet
--> adds distinct elements to an array i.e., jo array mein element insert karna chahte hain usko insert karne se pehle yeh operator
    check karta hai ki woh element pehle se toh present nahin hai array mein, agar nahin hai toh fir insert ho jaayega element,
    otherwise insert nahin hoga, example ke liye oopar jo maine array banayi hai, usmein agar koi bhi user "Javascript" add karna
    chahega toh add nahin hoga yeh element, kyoki pehle se hi present hai yeh element, kewal unique element hi insert ho sakta hai.

    ~   db.students.updateOne(
    ~       {_id: ObjectId('6271319283aedcdlreh023')},

    ~       {
    ~           $addToSet: {skills: "HTML"} // oopar jo array hai "skills" naam se, usmein "HTML" element already hai, toh firse add nahin hoga
    ~       }
    ~   )
*/
