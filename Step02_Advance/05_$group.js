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
! $group
--> suppose mujhe "class" field ke according grouping karni hai students ki, like "MCA" mein kitne bachche hain, "B.Tech" mein
    kitne bachche hain, etc. toh class ke basis par group karne hain bachche

^ Syntax:
    db.collection_name.aggregate([
        {
            $group: {
                _id: <expression>, // yahan par uss field kaa naam dena hai jiske basis par grouping karni hai, humare case mein "class" hai
                <field1>: {<accumulator1> : <expression1>},
                <field2>: {<accumulator2> : <expression2>},
                .
                .
                .
            }
        }
    ])

--> <field1> or <field2>, yeh dono custom fields hain i.e., apni marzi se koi bhi naam de sakte hain to store the data in that field.
--> 'accumulators' jo oopar "$group" ke syntax mein hai, actually mein woh operators hote hain, neeche list hai inki:
$sum
$avg
$median
$max
$min
$count
$push
$addToSet
$first
$last
$top
$topN
$bottom
$bottomN

^ CODE-1
~   db.students.aggregate([
~   	{
~   		$group: {
~   			_id: "$class"
~   		}
~   	}
~   ])

^ OUTPUT: 
    [
        { _id: 'B.Sc' },
        { _id: 'M.Tech' },
        { _id: 'B.Com' },
        { _id: 'BCA' },
        { _id: 'BBA' },
        { _id: 'B.Tech' },
        { _id: 'MCA' },
        { _id: 'MBA' }
    ]
--> "students" naam ki collection ke andar jitni bhi different-different classes exist karti hain woh saari classes group ho gayi, see above
    output.        
        
^ CODE-2  
!Question: ab mujhe group karna hai ki kaunsi class mein kitne bachche hain

db.students.aggregate([
    {
        $group: {
            _id: "$class",
            totalStudents: {$sum: 1}, // jaise ki oopar "syntax" mein bataya tha ki apni marzi se custom field bana sakte hain 
        }
    }
])

^ OUTPUT:
    [
        { _id: 'B.Sc', totalStudents: 2 }, // B.Sc mein 2 students hain bas
        { _id: 'BCA', totalStudents: 1 },
        { _id: 'MBA', totalStudents: 1 },
        { _id: 'M.Tech', totalStudents: 1 },
        { _id: 'B.Tech', totalStudents: 3 },
        { _id: 'BBA', totalStudents: 1 },
        { _id: 'MCA', totalStudents: 1 },
        { _id: 'B.Com', totalStudents: 1 }
    ]

! Question: If you want the total count of all students in the collection.  
^ CODE-3
~   db.students.aggregate([
~     {
~       $group: {
~         _id: null,
~         totalStudents: { $sum: 1 }
~       }
~     }
~   ])

^ OUTPUT: 
    [ { _id: null, totalStudents: 11 } ]


! Question: Ab main chahta hoon ki jiski age 20 se zyada hai and 20 se zyada wale bachche kaunsi class mein kitne hain.
^ CODE-4
--> Approach: -> oopar wala code same rahega, bas humein filter karne hain sabse pehle students, jisse ki 20 se zyada wale 
    bachche extract ho jaaye and then unn par "$group" operator lagado fir, first stage mein "$match" lagado jisse ki 20 se zyada
    age ke bachche extract ho jaayenge, or jo output aayega fir unn par 2nd stage mein "$group" lagado, simple!

~ db.students.aggregate([
~     {
~         $match: {age: {$gt: 20}}
~     },
~ 
~     {
~         $group: {
~             _id: "$class",
~             totalBachche: {$sum: 1}
~         }
~     }
~ ])    

^ OUTPUT:
  [
      { _id: 'B.Tech', totalBachche: 3 },
      { _id: 'MCA', totalBachche: 1 },
      { _id: 'M.Tech', totalBachche: 1 },
      { _id: 'BCA', totalBachche: 1 },
      { _id: 'MBA', totalBachche: 1 }
  ]


! Question: Ab main chahta hoon ki jiski age 20 se zyada hai and 20 se zyada wale bachche kaunsi class mein kitne hain using "$count".
^ CODE-5  

~ db.students.aggregate([
~     {
~         $match: {age: {$gt: 20}}
~     },
~ 
~     {
~         $group: {
~             _id: "$class",
~             totalBachche: {$count: {}} // empty curly braces rakhne hain count mein.
~         }
~     }
~ ])

^ OUTPUT:
  [
      { _id: 'B.Tech', totalBachche: 3 },
      { _id: 'MCA', totalBachche: 1 },
      { _id: 'M.Tech', totalBachche: 1 },
      { _id: 'BCA', totalBachche: 1 },
      { _id: 'MBA', totalBachche: 1 }
  ]


!Question: Ab "$sort" operator use karenge 
^ CODE-6

~   db.students.aggregate([
~     -> stage-1: mein grouping ki hai class ke basis par and then kaunsi class mein kitne bachche hain woh count kare hain after grouping.
~     {
~       $group: {
~         _id: "$class",
~         totalStudents: {$sum: 1}
~       } 
~     },
~   
~     -> stage-2: mein sorting ki hai, jo "totalStudents" oopar stage-1 mein aaye hain har class ke unke according sorting ki hai descending order mein 
~     {
~       $sort: {totalStudents: -1} // "$sort" mein humein field pass karna hota hai kis ke basis par sorting karni hai, toh oopar wala jo custom field banaya hai stage-1 mein "totalStudents" naam se, uske basis par sorting ki hai descending order mein, i.e. jiss class mein sabse zyada bachche hain woh pehle aayenge response mein.
~     }
~   ])

^ OUTPUT:
  [
    { _id: 'B.Tech', totalStudents: 3 },
    { _id: 'B.Sc', totalStudents: 2 },
    { _id: 'B.Com', totalStudents: 1 },
    { _id: 'M.Tech', totalStudents: 1 },
    { _id: 'BCA', totalStudents: 1 },
    { _id: 'MBA', totalStudents: 1 },
    { _id: 'BBA', totalStudents: 1 },
    { _id: 'MCA', totalStudents: 1 }
  ]


! Question: kaunsi class mein kaun sa bachcha hai uska naam show karana hai.
Approach: Sabse pehle toh grouping karenge "class" ke basis par, and then "$push" operator kaa use karenge, iss operator mein hum
          woh wala field pass karte hain jo humein show karana hai, humare case mein naam show karane hain har class ke bachon ke.

db.students.aggregate([
  {
    $group: {
      _id: "$class",
      studentNames: {$push: "$name"}
    }
  }
])
  
^ OUTPUT:
    [
      { _id: 'B.Sc', studentNames: [ 'Amit', 'Simran' ] }, // B.Sc mein "Amit and Simran" hain
      { _id: 'BCA', studentNames: [ 'Vikram' ] },
      { _id: 'MBA', studentNames: [ 'Pooja' ] },
      { _id: 'M.Tech', studentNames: [ 'Neha' ] },
      { _id: 'B.Tech', studentNames: [ 'Prashant', 'Rahul', 'Rohit' ] },
      { _id: 'BBA', studentNames: [ 'Karan' ] },
      { _id: 'MCA', studentNames: [ 'Anjali' ] },
      { _id: 'B.Com', studentNames: [ 'Sneha' ] }
    ]
*/





