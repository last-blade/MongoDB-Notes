/*
--> db.collection_name.find()
~ db.students.find()

--> db.collection_name.find({field-name: field-value})
~ db.students.find({age: 18}) // jis jis student ki age 18 hogi woh sab documents fetch ho jaayenge

--> db.collection_name.findOne({field-name: field-value})
~ db.students.findOne({age: 18}) // ismein sirf ek hi document fetch hoga jiski age 18 hogi, jo sabse pehle database mein milega wahi return ho jaayega

! projection(); 
--> iss method ke andar hum field-name pass karte hain and value 0 or 1 pass karte hain, 1 kaa matlab woh wala 
    field dikhana hai, 0 kaa matlab show nahin karna hai.
~ db.students.find().projection({age: 1, email: 1, name: 1, password: 0}); // ab bas "name, age, email" yeh teen hi show honge, baaki chahe 10 field ho woh sab show nahin honge.   
~ db.students.find({class: "10th"}).projection(age: 1); // jo students class 10th mein hain bas unki age show hogi fetched data mein

! count(); 
--> agar hum fetched documents ki counting bhi show karana chahte hain toh fir count method kaa use karte hain find() ke saath
~ db.students.find().count(); // jitne bhi documents honge unki counting aayegi bas
~ db.students.find({class: "12th"}).count(); // 12th class mein jitne bachche hain unki counting aayegi

! sort(); 
--> iss method ke andar hum field-name and value(0 or 1) pass karte hain, 1 means ascending and 0 means descending order
~ db.students.find().sort({name: 1}); // jitne bhi students hain woh sab name wise ascending order mein sort ho jaayenge

! limit(); 
--> iss method ke andar kewal ek numeric value pass karte hain jo batati hai ki kitne documents fetch karne hain
~ db.students.find().limit(5); // kewal 5 documents hi fecth honge 
^ NOTE: find method ke andar bhi hum likh sakte hain like find({age: 18}) jiski age 18 hai woh 5 students hi fetch honge kewal.

! skip();
--> iss method ke andar hum numeric value pass karte hain or yeh method limit ke saath use karte hain, like pagination mein use 
    karte hain isko, first page par 10 item show karane hain or fir next page par 10 page show karane hain
~ db.students.find().limit(10).skip(10);
*/