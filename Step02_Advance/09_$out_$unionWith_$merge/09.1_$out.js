/*
! $out
--> yeh wala operator basically new collection create karne ke kaam aata hai and yeh collection jo hai existing collection mein se
    bana sakte hain.
    EXAMPLE: suppose ek collection hai "students" naam ki and usmein se main chahta hoon ki jiski age 22 se zyada hai uski ek new
            collection ban jaaye, toh fir jiski age 22 se zyada hai uski ek nayi collection ban jaayegi. Yaa fir main chahta hoon
            ki jo jo student "B.Tech" class mein hai, unn students ki new collection create ho jaye alag.


^ CODE-1 
~   db.students.aggregate([
~       {
~           $match: {"class": "B.Tech"},
~       },
~   
~       {
~           $out: "BtechStudents"
~       }
~   ])
    
--> Ek nayi collection ban jaayegi database ke andar permanent "BtechStudents" naam se and then usmein humne Btech wale students ko 
    insert kar diya hai by using match operator.
^ OUTPUT:
    [
        {
            _id: ObjectId('6824bfdf69c19216f06c4bd0'),
            name: 'Prashant',
            age: 24,
            class: 'B.Tech',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        },
        {
            _id: ObjectId('6824c06d69c19216f06c4bd3'),
            name: 'Rahul',
            age: 21,
            class: 'B.Tech',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        },
        {
            _id: ObjectId('6824c06d69c19216f06c4bd9'),
            name: 'Rohit',
            age: 21,
            class: 'B.Tech',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
    ]
*/