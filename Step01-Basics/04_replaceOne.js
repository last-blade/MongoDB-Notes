/*
! replaceOne
--> yeh method jo hai poore document ko replace karne ke liye kaam aata hai, see example below:

^[
^  {
^    _id: ObjectId('6824c06d69c19216f06c4bda'),
^    name: 'Anjali',
^    age: 24,
^    class: 'MCA',
^    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
^  },

^  {
^    _id: ObjectId('5224c06d689216f06c4bda'),
^    name: 'Prashant',
^    age: 24,
^    class: 'Btech',
^    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
^  }
^]
jaise ki example hai oopar ek, aise hi multiple documents hain kisi collection mein suppose "students" naam ki collection mein hai 
2 documents pade huye hain, and main chahta hoon ki "Anjali" wala jo document hai usko hata ke kisi doosre user se replace kar doon

~   db.students.replaceOne(
~       {
~           _id: ObjectId('6824c06d69c19216f06c4bda')
~       },
   
~       {
~           name: "SRK", 
~           age: 24, 
~           class: "PHD", 
~           skills: ["MERN Stack", ".Net Developer"]
~       }
~   )

oopar wale code se ab jo hai "Anjali" jo student hai woh hatt jaayegi database se, or ab yeh new student aa jaayega
! updated student collection below:-
^[
^  {
^    _id: ObjectId('5224c06d689216f06c4bda'),
^    name: "SRK", 
^    age: 24, 
^    class: "PHD", 
^    skills: ["MERN Stack", ".Net Developer"]
^  }

^  {
^    _id: ObjectId('5224c06d689216f06c4bda'),
^    name: 'Prashant',
^    age: 24,
^    class: 'Btech',
^    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
^  }
^]
*/