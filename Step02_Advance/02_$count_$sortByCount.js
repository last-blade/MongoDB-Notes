// SAMPLE-DATA for testing:
[
  {
    _id: ObjectId('6824bfdf69c19216f06c4bd0'),
    name: 'Prashant',
    age: 24,
    class: 'B.Tech',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd1'),
    name: 'Amit',
    age: 19,
    class: 'B.Sc',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd2'),
    name: 'Sneha',
    age: 20,
    class: 'B.Com',
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
    _id: ObjectId('6824c06d69c19216f06c4bd4'),
    name: 'Neha',
    age: 22,
    class: 'M.Tech',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd5'),
    name: 'Vikram',
    age: 24,
    class: 'BCA',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd6'),
    name: 'Pooja',
    age: 23,
    class: 'MBA',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd7'),
    name: 'Karan',
    age: 20,
    class: 'BBA',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd8'),
    name: 'Simran',
    age: 19,
    class: 'B.Sc',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bd9'),
    name: 'Rohit',
    age: 21,
    class: 'B.Tech',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  },
  {
    _id: ObjectId('6824c06d69c19216f06c4bda'),
    name: 'Anjali',
    age: 24,
    class: 'MCA',
    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
  }
]
//------------Above is sample data for testing purpose only, jo bhi aggregation pipeline likhenge oopar wale sample par likhenge-------------

/*
! $count
^ CODE-1
~   db.students.aggregate([
~       {
~           $match: {age: 20} // jis jis ki age 20 hogi woh wale documents filter ho jaayenge or fir neeche ek or pipeline likhi hai jismein filtered documents ki counting ho jaayegi
~       },
~   
~       {
~           $count: "totalStudents" // yahan par maine apni marji se ek variable name liya hai "totalStudents", jismein count value store hogi
~       }
~   ])

^ OUTPUT: 
    [ { totalStudents: 2 } ]


!----------------------------------------------------
^ CODE-2
~   db.students.aggregate([
~       {
~           $match: {age: 20}
~       },
~   
~       {
~           $sort: {age: 1}
~       }
~   ])

^ OUTPUT:
    [
        {
            _id: ObjectId('6824c06d69c19216f06c4bd2'),
            name: 'Sneha',
            age: 20,
            class: 'B.Com',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        },
        {
            _id: ObjectId('6824c06d69c19216f06c4bd7'),
            name: 'Karan',
            age: 20,
            class: 'BBA',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
    ]

!----------------------------------------------------
^ CODE-3
~   db.students.aggregate([
~       {
~           $match: {age: 20}
~       },
~   
~       {
~           $sort: {age: 1, name: 1} // pehle "age" ascending order mein sort hongi or fir name wise sort hoga in ascending order
~       },
~       {
~           $project: {name: 1, class: 1, _id: 0}
~       }
~   ])

^ OUTPUT:
    [ 
      { name: 'Karan', class: 'BBA' }, 
      { name: 'Sneha', class: 'B.Com' } 
    ]

!----------------------------------------------------
! $project; mein extra field bhi add kar sakte hain apni taraf se.
^ CODE-4    
--> '$project' ke andar hum apna khud kaa field bhi bana sakte hain, jaise ki mujhe user ko response bhejna hai ki jo 18 yaa
    18 se zyada age wala hai usko hum validAge bolenge, i.e., hum khud kaa ek field banayenge "validAge", jismein boolean value
    hogi

~   db.students.aggregate([
~       {
~           $sort: {name: 1}
~	},
~        {
~            $project: {name: 1, class: 1, _id: 0, validAge: {$gte: ["$age", 18]}}
~        }
~   ])  

^ OUTPUT:
    [
        { name: 'Amit', class: 'B.Sc', validAge: true },
        { name: 'Anjali', class: 'MCA', validAge: true },
        { name: 'Karan', class: 'BBA', validAge: true },
        { name: 'Neha', class: 'M.Tech', validAge: true },
        { name: 'Pooja', class: 'MBA', validAge: true },
        { name: 'Prashant', class: 'B.Tech', validAge: true },
        { name: 'Rahul', class: 'B.Tech', validAge: true },
        { name: 'Rohit', class: 'B.Tech', validAge: true },
        { name: 'Simran', class: 'B.Sc', validAge: true },
        { name: 'Sneha', class: 'B.Com', validAge: true },
        { name: 'Vikram', class: 'BCA', validAge: true }
    ]
--> jis jis ki age 18 yaa usse zyada hai toh validAge: true hai otherwise false hai, see above OUTPUT. 


!---------------------------------------------------------------    
! $sortByCount

^ CODE-1
~   db.students.aggregate([
~     {
~       $sortByCount: "$class" // ismein "$sortByCount" operator jo hai, woh ek field accept karta hai, jsie ki yahan par maine "class" field ke basis par counting ki hai, ki har ek class ke andar kitne students hain, or output ke andar '_id' mein 'class' name aa jaayega kyoki maine class ke basis par sort kiya hai
~     }
~   ])   
  
^ OUTPUT: 
    [
        { _id: 'B.Tech', count: 3 },
        { _id: 'B.Sc', count: 2 },
        { _id: 'M.Tech', count: 1 },
        { _id: 'BCA', count: 1 },
        { _id: 'B.Com', count: 1 },
        { _id: 'MBA', count: 1 },
        { _id: 'BBA', count: 1 },
        { _id: 'MCA', count: 1 }
    ]    
*/

