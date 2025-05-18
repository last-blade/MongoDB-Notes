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

^ CODE-7
~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         studentNames: {$push: "$name"} // agar mujhe poora hi record chahiye har student kaa, toh fir "$name" ki jagah "$$ROOT" likhna hai bas, see CODE-8
~       }
~     }
~   ])
  
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
!-------------------------------------------------------------------------------------more detailed version of CODE-7
^CODE-8    
~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         studentNames: {$push: "$$ROOT"},
~       }
~     }
~   ])    

^ OUTPUT:
  [
    {
      _id: 'BCA',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bd5'),
          name: 'Vikram',
          age: 24,
          class: 'BCA',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    },
    {
      _id: 'M.Tech',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bd4'),
          name: 'Neha',
          age: 22,
          class: 'M.Tech',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    },
    {
      _id: 'MBA',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bd6'),
          name: 'Pooja',
          age: 23,
          class: 'MBA',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    },
    {
      _id: 'B.Sc',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bd1'),
          name: 'Amit',
          age: 19,
          class: 'B.Sc',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        },
        {
          _id: ObjectId('6824c06d69c19216f06c4bd8'),
          name: 'Simran',
          age: 19,
          class: 'B.Sc',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    },
    {
      _id: 'B.Tech',
      studentNames: [
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
    },
    {
      _id: 'BBA',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bd7'),
          name: 'Karan',
          age: 20,
          class: 'BBA',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    },
    {
      _id: 'MCA',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bda'),
          name: 'Anjali',
          age: 24,
          class: 'MCA',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    },
    {
      _id: 'B.Com',
      studentNames: [
        {
          _id: ObjectId('6824c06d69c19216f06c4bd2'),
          name: 'Sneha',
          age: 20,
          class: 'B.Com',
          skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
        }
      ]
    }
  ] 


!Question: Ab main dekhna chahta hoon ki har ek class ke andar sabse zyada age kis bachche ki hai, like "B.Sc" mein sabse zyada age kis ki hai, "B.tech" mein sabse zyada age kis ki hai, etc.
Approach: sabse pehle toh class ke basis par grouping karenge, or fir har ek class nikal ke aa jaayegi, and then uss individual
          class mein sabse zyada age wale bachche ko extract kar lenge using "$max" operator, or yeh operator hum kis par lagayenge?
          Toh humein max age wala student chahiye, toh "age" wale field par hi lagayenge "$max" operator like this {$max: "$age"}
          
^ CODE-9
~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         maxStudentAge: {$max: "$age"}, // aise hi "$min" operator laga sakte hain, same average age bhi nikal sakte hain using "$avg"
~       }
~     }
~   ])

^ OUTPUT:
  [
    { _id: 'BCA', maxStudentAge: 24 },
    { _id: 'MCA', maxStudentAge: 24 },
    { _id: 'B.Com', maxStudentAge: 20 },
    { _id: 'B.Tech', maxStudentAge: 24 },
    { _id: 'BBA', maxStudentAge: 20 },
    { _id: 'MBA', maxStudentAge: 23 },
    { _id: 'M.Tech', maxStudentAge: 22 },
    { _id: 'B.Sc', maxStudentAge: 19 }
  ]

! Question:  Average age per class
^ CODE-10
~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         avgerageStudentAge: {$avg: "$age"},
~       }
~     }
~   ])
  
^ OUTPUT:
  [
    { _id: 'BCA', avgerageStudentAge: 24 },
    { _id: 'MCA', avgerageStudentAge: 24 },
    { _id: 'B.Com', avgerageStudentAge: 20 },
    { _id: 'B.Tech', avgerageStudentAge: 22 },
    { _id: 'BBA', avgerageStudentAge: 20 },
    { _id: 'B.Sc', avgerageStudentAge: 19 },
    { _id: 'MBA', avgerageStudentAge: 23 },
    { _id: 'M.Tech', avgerageStudentAge: 22 }
  ]


! Question:  Average age overall including all classes
^ CODE-11
~   db.students.aggregate([
~     {
~       $group: {
~         _id: null,
~         avgerageStudentAge: {$avg: "$age"},
~       }
~     }
~   ])
  
^ OUTPUT:
  [ { _id: null, avgerageStudentAge: 21.545454545454547 } ]


! Question: pehle grouping karenge class ke according and then uss class mein sabse pehla document return karna hai, iske liye "$first" operator use karenge

^ CODE-12
~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         first_student: {$first: "$name"} // agar poora record chahiye har student kaa, toh fir "$$ROOT" lagana hai bas "$name" ki jagah. Aise hi "$last" operator bhi hota hai "$first" ke tarah
~       }
~     }
~   ])

^ OUTPUT: 
  [
    { _id: 'B.Tech', first_student: 'Prashant' },
    { _id: 'BBA', first_student: 'Karan' },
    { _id: 'B.Com', first_student: 'Sneha' },
    { _id: 'MCA', first_student: 'Anjali' },
    { _id: 'MBA', first_student: 'Pooja' },
    { _id: 'B.Sc', first_student: 'Amit' },
    { _id: 'M.Tech', first_student: 'Neha' },
    { _id: 'BCA', first_student: 'Vikram' }
  ]

todo--> "$first" and  "$last" operator ke advance versions hain "$top" and "$bottom"----------------------------------------------------------

! "$top"
-->iss operator ke andar 2 fields zaroori lene hote hain(i.e., 'output' and 'sortBy'), pehle field 'output' mein hum array dete hain and
    uss array mein woh wale fields ke naam dete hain jo humein response mein chahiye, and second field 'sortBy' mein humein woh wali
    value deni hoti hai jisse humein osrting karni hai, neeche wale case mein mujhe 'age' ke according sorting karni hai and age mein
    hum 1/-1 value dete hain for ascending and descending order.    

^ CODE-13
~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         top_student: {
~           $top: {
~             output: ["$name", "$age", "$class"],
~             sortBy: {"age": 1}
~           }
~         }
~       }
~     }
~   ])
^How the above code is working: 
--> Step:1 sabse pehle grouping ho rahi hai on the basis of 'class' field.
--> Step:2  fir humare custom field "top_student" mein "$top" operator laga hua hai, jis mein ki sabse pehle "sorting" hogi age 
    ke hisaab se and then unn students ki details show hongi jo humne 'output' array mein pass kiye hain sirf wahi fields show
    honge response mein.

^ OUTPUT: 
  [
    { _id: 'B.Tech', top_student: [ 'Rahul', 21, 'B.Tech' ] }, // poori B.Tech class mein sabse kam age wala student(Rahul) fetch ho gaya hai and uski details aa gayi hain
    { _id: 'BBA', top_student: [ 'Karan', 20, 'BBA' ] }, // aise hi BBA class mein sabse chhoti age wala student fetch hua hai, aise hi neeche har class mein sabse kam age wala bachca getch hua hai, kyoki humne sorting ascending order mein ki hai age wise and then jo top par student aaya woh wala fetch ho jaayega, kyoki humen "$top" operator kaa use kiya hai isliye sorting hone ke baad jo bachcha apni class mein top par aaya woh fetch ho gaya and top par sabse kam age wala aayega kyoki ascending order mein sorting huyi hai 
    { _id: 'B.Com', top_student: [ 'Sneha', 20, 'B.Com' ] },
    { _id: 'MCA', top_student: [ 'Anjali', 24, 'MCA' ] },
    { _id: 'MBA', top_student: [ 'Pooja', 23, 'MBA' ] },
    { _id: 'B.Sc', top_student: [ 'Amit', 19, 'B.Sc' ] },
    { _id: 'M.Tech', top_student: [ 'Neha', 22, 'M.Tech' ] },
    { _id: 'BCA', top_student: [ 'Vikram', 24, 'BCA' ] }
  ]


! "$topN"--------------------------------------------------------------------------Advance version of "$top"    
!Question: abhi tak oopar "$top" mein kewal top par jo first student aa raha tha woh fetch ho raha tha, lekin agar mujhe top ke 2 bachche fetch karne ho toh ?
^ Solution: iske liye hum "$topN" operator kaa use kar sakte hain, bas kuch nahin karna, ismein 'n: value', 'n' means no. of records you want to fetch

~   db.students.aggregate([
~     {
~       $group: {
~         _id: "$class",
~         top_student: {
~           $topN: {
~             output: ["$name", "$age", "$class"],
~             sortBy: {"age": 1},
~             n: 2
~           }
~         }
~       }
~     }
~   ])

^ OUTPUT:
  [
    {
      _id: 'B.Tech',
      top_student: [ [ 'Rahul', 21, 'B.Tech' ], [ 'Rohit', 21, 'B.Tech' ] ] // 'B.tech' class ke pehle 2 bachche fetch ho gaye, remember: pehle sorting huyi hai age wise ascending order mein and then top ke 2 students fetch huye hain, same neeche baaki ki classes mein hua hai.
    },
    { _id: 'BBA', top_student: [ [ 'Karan', 20, 'BBA' ] ] }, // BBA class mein hai hi ek student, isliye 2 records fetch nahin huye.
    { _id: 'B.Com', top_student: [ [ 'Sneha', 20, 'B.Com' ] ] },
    { _id: 'MCA', top_student: [ [ 'Anjali', 24, 'MCA' ] ] },
    { _id: 'MBA', top_student: [ [ 'Pooja', 23, 'MBA' ] ] },
    { _id: 'M.Tech', top_student: [ [ 'Neha', 22, 'M.Tech' ] ] },
    {
      _id: 'B.Sc',
      top_student: [ [ 'Amit', 19, 'B.Sc' ], [ 'Simran', 19, 'B.Sc' ] ]
    },
    { _id: 'BCA', top_student: [ [ 'Vikram', 24, 'BCA' ] ] }
  ]

!-----------------------Same cheez "$bottom" and "$bottomN" operator mein hoti hai $top and $topN operator ki tarah---------------------------- 
*/





