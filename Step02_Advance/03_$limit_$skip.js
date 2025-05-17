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
!---------------------------------------------------------------    
^ CODE-1 ($limit)    

~ db.students.aggregate([
~     {
~       $match: {age: {$gte: 20}}
~     },

~     {
~         $project: {name: 1, class: 1, _id: 0}
~     },

~     {
~       $limit: 2 // ek page par 2 hi document show honge
~     }
~ ])

^ OUTPUT:
    [
      { name: 'Prashant', class: 'B.Tech' },
      { name: 'Sneha', class: 'B.Com' }
    ]

!---------------------------------------------------------------    
^ CODE-2 ($skip)    // hamesha "$skip" ko "$limit" se pehle likhna hai 

~   db.students.aggregate([
~        {
~          $match: {age: {$gte: 20}}
~        },
~        {
~            $project: {name: 1, class: 1, _id: 0}
~        },
~        {
~          $skip: 0 // yahan par skip ki value 0 hai, toh fir 1st and 2nd record show karega (i.e. document), agar yahan par main skip ki value "2" kar dunga toh fir 3rd and 4th record dikhayega, agar skip ki value 4 kardun toh fir 5th and 6th record dikhayega
~        },
~        {
~          $limit: 2 
~        }
~   ])

^ OUTPUT:
    [
      { name: 'Prashant', class: 'B.Tech' },
      { name: 'Sneha', class: 'B.Com' }
    ] 

*/