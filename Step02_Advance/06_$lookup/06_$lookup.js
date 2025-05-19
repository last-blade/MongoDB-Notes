// SAMPLE-DATA for testing:
//! Student Collection
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

//! Library Collection
[
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd0'),
    book: 'JavaScript: The Good Parts',
    student_id: ObjectId('6824bfdf69c19216f06c4bd0')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd1'),
    book: 'You Don’t Know JS',
    student_id: ObjectId('6824c06d69c19216f06c4bd1')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd2'),
    book: 'Eloquent JavaScript',
    student_id: ObjectId('6824c06d69c19216f06c4bd2')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd3'),
    book: 'Node.js Design Patterns',
    student_id: ObjectId('6824c06d69c19216f06c4bd3')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd4'),
    book: 'Clean Code',
    student_id: ObjectId('6824c06d69c19216f06c4bd4')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd5'),
    book: 'Designing APIs with Node.js',
    student_id: ObjectId('6824c06d69c19216f06c4bd5')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd6'),
    book: 'Mastering Express.js',
    student_id: ObjectId('6824c06d69c19216f06c4bd6')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd7'),
    book: 'MongoDB: The Definitive Guide',
    student_id: ObjectId('6824c06d69c19216f06c4bd7')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd8'),
    book: 'Learning Web Design',
    student_id: ObjectId('6824c06d69c19216f06c4bd8')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bd9'),
    book: 'The Pragmatic Programmer',
    student_id: ObjectId('6824c06d69c19216f06c4bd9')
  },
  {
    _id: ObjectId('682ab6e9dec65c85646c4bda'),
    book: 'Fullstack Node.js',
    student_id: ObjectId('6824c06d69c19216f06c4bda')
  }
]

//------------Above is sample data for testing purpose only, jo bhi aggregation pipeline likhenge oopar wale sample par likhenge-------------



/* 
!See the 'lookup example.png' image, wahan par 2 tables hain 'Student & Library'

^--> Lobrary table mein show ho raha hai ki kaunse bachche ne kaunsi book issue karayi huyi hai, i.e. "ABC" book ko student_id: 2 ne
    issue karaya hua hai and student_id: 2 jo hai Salman khan ki hai, iska matlab "ABC" book Salman khan ke paas hai.


todo--> toh ab humari problem hai ki humein show karna hai kaunsi book kaunse student ne issue karayi huyi hai and woh kaunsi class kaa hai.

! Conclusion: $lookup operator basically 2 collections ko join karne ke kaam aata hai.

^ Syntax: 
    db.collection_name.aggregate([
        $lookup: {
            from: "jiss collection par aggregate laga rahe hain(suppose "library") usko doosri kis collection ke saath join karna hai(suppose "students"), toh yahan par basically uss collection kaa naam likhte hain jisse join karna hai" 
            localField:"library collection ke andar aisa kaunsa field hai jisko hum students collection se join karenge"
            foreignField: "foreign field ke andar humein woh wali value deni hai jo hum ne "from" field mein collection name pass kiya hai suppose "students" toh ab student collection ke andar humein dekhna hai ki "local field" ki value ko kis student collection ke kis field se attach karna hai
            as: "studentData" // apni marzi se koi naam de sakte hain jismein data aayega filter hoke lookup kaa, and yeh data Array ki form mein aayega "studentData" mein
        }
    ])


^ CODE-1
~     db.library.aggregate([
~         {
~             $lookup: {
~                 from: "students",
~                 localField: "student_id",
~                 foreignField: "_id",
~                 as: "studentData"
~             }
~         }
~     ]) 
    
^ OUTPUT:
    [
        {
            _id: ObjectId('682ab6e9dec65c85646c4bd0'),
            book: 'JavaScript: The Good Parts',
            student_id: ObjectId('6824bfdf69c19216f06c4bd0'),
            studentData: [ // naya field create ho gaya, jismein student ki details hain, i.e. Javascript: The Good Parts naam ki book "Prashant" naam ke student ne issue karayi huyi hai
                {
                    _id: ObjectId('6824bfdf69c19216f06c4bd0'),
                    name: 'Prashant',
                    age: 24,
                    class: 'B.Tech',
                    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
                }
            ]
        },
        {
            _id: ObjectId('682ab6e9dec65c85646c4bd1'),
            book: 'You Don’t Know JS',
            student_id: ObjectId('6824c06d69c19216f06c4bd1'),
            studentData: [
                {
                    _id: ObjectId('6824c06d69c19216f06c4bd1'),
                    name: 'Amit',
                    age: 19,
                    class: 'B.Sc',
                    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
                }
            ]
        },
        {
            _id: ObjectId('682ab6e9dec65c85646c4bd2'),
            book: 'Eloquent JavaScript',
            student_id: ObjectId('6824c06d69c19216f06c4bd2'),
            studentData: [
                {
                    _id: ObjectId('6824c06d69c19216f06c4bd2'),
                    name: 'Sneha',
                    age: 20,
                    class: 'B.Com',
                    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
                }
            ]
        },
        {
            _id: ObjectId('682ab6e9dec65c85646c4bd3'),
            book: 'Node.js Design Patterns',
            student_id: ObjectId('6824c06d69c19216f06c4bd3'),
            studentData: [
                {
                    _id: ObjectId('6824c06d69c19216f06c4bd3'),
                    name: 'Rahul',
                    age: 21,
                    class: 'B.Tech',
                    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
                }
            ]
        },
        {
            _id: ObjectId('682ab6e9dec65c85646c4bd4'),
            book: 'Clean Code',
            student_id: ObjectId('6824c06d69c19216f06c4bd4'),
            studentData: [
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
            _id: ObjectId('682ab6e9dec65c85646c4bd5'),
            book: 'Designing APIs with Node.js',
            student_id: ObjectId('6824c06d69c19216f06c4bd5'),
            studentData: [
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
            _id: ObjectId('682ab6e9dec65c85646c4bd6'),
            book: 'Mastering Express.js',
            student_id: ObjectId('6824c06d69c19216f06c4bd6'),
            studentData: [
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
            _id: ObjectId('682ab6e9dec65c85646c4bd7'),
            book: 'MongoDB: The Definitive Guide',
            student_id: ObjectId('6824c06d69c19216f06c4bd7'),
            studentData: [
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
            _id: ObjectId('682ab6e9dec65c85646c4bd8'),
            book: 'Learning Web Design',
            student_id: ObjectId('6824c06d69c19216f06c4bd8'),
            studentData: [
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
            _id: ObjectId('682ab6e9dec65c85646c4bd9'),
            book: 'The Pragmatic Programmer',
            student_id: ObjectId('6824c06d69c19216f06c4bd9'),
            studentData: [
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
            _id: ObjectId('682ab6e9dec65c85646c4bda'),
            book: 'Fullstack Node.js',
            student_id: ObjectId('6824c06d69c19216f06c4bda'),
            studentData: [
                {
                    _id: ObjectId('6824c06d69c19216f06c4bda'),
                    name: 'Anjali',
                    age: 24,
                    class: 'MCA',
                    skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
                }
            ]
        }
    ]


! Question: Oopar jo "studentData" naam se array bani hai or usmein student ki details aa rahi hain object ke andar, main chahta hoon ki woh "studentData" jo array of objects mein aa raha hai, woh bas object ki form mein aaye bas naa ki array of object mein.
^ Solution: iske liye hum "$unwind" operator kaa use karenge, jisse ki array kaa data bahar aa jaayega, or ab array mein nahin rahega.

^ CODE-2
    db.library.aggregate([
        {
            $lookup: {
                from: "students",
                localField: "student_id",
                foreignField: "_id",
                as: "studentData"
            }
        },

        { $unwind: "$studentData" } // "studentData" field array tha pehle, ab ek object ban gaya hai, see below output:
    ]) 

^ OUTPUT: 
    [
        {
            _id: ObjectId('682ab6e9dec65c85646c4bd0'),
            book: 'JavaScript: The Good Parts',
            student_id: ObjectId('6824bfdf69c19216f06c4bd0'),
            studentData: {
            _id: ObjectId('6824bfdf69c19216f06c4bd0'),
            name: 'Prashant',
            age: 24,
            class: 'B.Tech',
            skills: [ 'Javascript', 'Expressjs', 'Nodejs' ]
            }
        },
        .
        .
        .
        /Neeche or bhi data hai, lengthy hai isliye bas ek hi response rakha hai/
    ] 
        


]
*/


