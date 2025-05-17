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

! $match
--> yeh wala operator basically filter karne ke kaam aata hai, like mujhe filter karna hai jiski age 18 se zyada hai.

~   db.collection-name.aggregate([
        stage-1
~       {
~           $match: {age: {$gt: 20}},
~       },
        stage-2
~       {
~           $sort: {age: 1}
~       },
        stage-3
~       {
~           $project: {name: 1, age: 1, _id: 0, class: 1}
~       }
~   ])

!--------------------------------------------------------------- 
^ CODE-1
db.students.aggregate([
   	{
		  $match: {age: {$gt: 20}}
   	},
	{
		$sort: {age: 1}
	},
	{
		$project: {name: 1, age: 1, class: 1, _id: 0}
	}
])
^ OUTPUT:
    { name: 'Rahul', age: 21, class: 'B.Tech' },
    { name: 'Rohit', age: 21, class: 'B.Tech' },
    { name: 'Neha', age: 22, class: 'M.Tech' },
    { name: 'Pooja', age: 23, class: 'MBA' },
    { name: 'Prashant', age: 24, class: 'B.Tech' },
    { name: 'Vikram', age: 24, class: 'BCA' },
    { name: 'Anjali', age: 24, class: 'MCA' }

!---------------------------------------------------------------    
^ CODE-2
db.students.aggregate([
   	{
		  $match: {age: 20}
   	},
])    
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

!--------------------------------------------------------------- 
^ CODE-3
~   db.students.aggregate([
~      	{
~   		$match: {$and: [{age: {$gt: 18}}, {class: "B.Tech"}]} // yahan par "$and" operator kaa bhi use kar liya humne, jiski age 18 se zyada hogi or class "B.Tech" hogi, yeh dono agar true hoti hain tabhi response aayega, agar koi bhi condition false huyi toh fir null result aayega, kyoki yeh "$and" operator hai
~      	},
~   	{
~   		$sort: {age: 1}
~   	},
~   	{
~   		$project: {name: 1, age: 1, class: 1, _id: 0}
~   	}
~   ])
^ OUTPUT: 
    [
        { name: 'Rahul', age: 21, class: 'B.Tech' },
        { name: 'Rohit', age: 21, class: 'B.Tech' },
        { name: 'Prashant', age: 24, class: 'B.Tech' }
    ]
    
*/