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
! $sample
--> yeh operator koi bhi random documents return karta hai, and yeh 'size' naam ki key accept karta hai or usmein hum 
    numeric value pass karte hain, like mujhe random koi 2 documents chahiye database mein se, toh $sample: {size: 2} 
    yeh iss kaam aata hai.

~   db.students.aggregate([
~       {
~           $sample: {size: 2}
~       }
~   ])

^ OUTPUT: 
    [
        {
            _id: ObjectId('6824c06d69c19216f06c4bd7'),
            name: 'Karan',
            age: 20,
            class: 'BBA',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        },
        {
            _id: ObjectId('6824c06d69c19216f06c4bd1'),
            name: 'Amit',
            age: 19,
            class: 'B.Sc',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
    ]

*/