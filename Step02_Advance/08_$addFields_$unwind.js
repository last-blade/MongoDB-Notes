//DUMMY DATA for example purpose
users:[
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
    firstname: 'Prashant',
    lastname: 'Tyagi',
    marks: [ 80, 89, 85, 92 ],
    city: 'Delhi'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
    firstname: 'Anjali',
    lastname: 'Mehta',
    marks: [ 75, 88, 90, 82 ],
    city: 'Mumbai'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
    firstname: 'Rohan',
    lastname: 'Singh',
    marks: [ 65, 70, 68, 72 ],
    city: 'Lucknow'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
    firstname: 'Sneha',
    lastname: 'Patel',
    marks: [ 90, 93, 95, 97 ],
    city: 'Ahmedabad'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
    firstname: 'Amit',
    lastname: 'Verma',
    marks: [ 55, 60, 58, 62 ],
    city: 'Bangalore'
  },
  {
    _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
    firstname: 'Bhandari',
    lastname: 'Singh',
    marks: [ 80, 78, 82, 91 ],
    city: null
  }
]
//--------------------------------------------------------------------------------------------------------------------------------------------

/*
! $addFields:---------------------------------------------------------------------------------------------------------------------------------
--> where to use:- jab bhi humein ki koi 2 fields ko combine kar ke ek custom field mein insert karna hota hai, like kisi document
    mein 2 fields hain 'firstname: Prashant' and 'lastname: Tyagi', but main chahta hoon ki jab API response jaaye toh fir yeh 2 fields combine
    hokar jaaye i.e., fullname: "Prashant Tyagi", toh issi jagah par "$addFields" operator kaa use kiya jaata hai.

^ Syntax:
db.users.aggregate([
    {
        $addFields: {
            fullname: {$concat: ["$firstname", " ", "$lastname"]},
            firstname: "$$REMOVE", // yeh isliye likha hai kyoki, firstname and lastname wale field toh API response mein jaayenge hi, or humein iski zaroora hi nahin hai, kyoki humne "fullname" kaa ek naya field bana diya hai jismein name aa raha hai, toh humne firstname and lastname field ki need hi nahin hai, isliye hum inn dono ko remove kar rahe hain API response mein se
            lastname: "$$REMOVE",
        }
    }    
])

! Question: fisrtname and lastname wale field ko combine karke 'fullname' naam kaa custom field bana do. 
^   CODE-1
~   db.users.aggregate([
~       {
~           $addFields: {
~               fullname: {$concat: ["$firstname", " ", "$lastname"]}, // yahan par hum existing field kaa naam bhi de sakte hain "fullname"(custom field) ki jagah, like '_id' de denge toh fir _id mein firstname and lastname combine hokar _id wale field mein insert ho jaayega, and _id ki previous value delete ho jaayegi
~               firstname: "$$REMOVE",
~               lastname: "$$REMOVE"
~           }
~       }
~   ])

^ OUTPUT:
    [
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            marks: [ 80, 89, 85, 92 ],
            city: 'Delhi',
            fullname: 'Prashant Tyagi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            marks: [ 75, 88, 90, 82 ],
            city: 'Mumbai',
            fullname: 'Anjali Mehta'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            marks: [ 65, 70, 68, 72 ],
            city: 'Lucknow',
            fullname: 'Rohan Singh'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            marks: [ 90, 93, 95, 97 ],
            city: 'Ahmedabad',
            fullname: 'Sneha Patel'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            marks: [ 55, 60, 58, 62 ],
            city: 'Bangalore',
            fullname: 'Amit Verma'
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            marks: [ 80, 78, 82, 91 ],
            city: null,
            fullname: 'Bhandari Singh'
        }
    ]


! Question: oopar hum sample data mein dekh rahe hain ki Bhandari Singh naam ke user mein city ki value 'null' show ho rahi hai, toh main chahta hoon ki jiski city ki value null hai, uss user ke document mein city wala field hi show nahin hona chahiye
^ CODE-2
~   db.users.aggregate([
~       {
~           $addFields: {
~               fullname: {$concat: ["$firstname", " ", "$lastname"]},
~               firstname: "$$REMOVE",
~               lastname: "$$REMOVE",
~               city: {
~                   $ifNull: ["$city", "$$REMOVE"]
~               }
~           }
~       }
~   ])

--> neeche dekho sabse last wale output mein, wahan par "city" field remove ho gaya hai "Bhandari Singh" ke document mein se
^ OUTPUT:
    [
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            marks: [ 80, 89, 85, 92 ],
            city: 'Delhi',
            fullname: 'Prashant Tyagi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            marks: [ 75, 88, 90, 82 ],
            city: 'Mumbai',
            fullname: 'Anjali Mehta'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            marks: [ 65, 70, 68, 72 ],
            city: 'Lucknow',
            fullname: 'Rohan Singh'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            marks: [ 90, 93, 95, 97 ],
            city: 'Ahmedabad',
            fullname: 'Sneha Patel'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            marks: [ 55, 60, 58, 62 ],
            city: 'Bangalore',
            fullname: 'Amit Verma'
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            marks: [ 80, 78, 82, 91 ],
            fullname: 'Bhandari Singh'
        }
    ]


! Question: main chahta hoon ki jiss city ki value "Lucknow" hai, woh city field hi hatt jaaye uss document mein se.
--> Approach: aisa karne ke liye ek "$cond" i.e. condition operator hota hai, jiske andar hum if and then kaa use karte hain 
^ CODE-3    
db.users.aggregate([
    {
        $addFields: {
            fullname: {$concat: ["$firstname", " ", "$lastname"]},
            firstname: "$$REMOVE",
            lastname: "$$REMOVE",
            city: { // wahi name rakhna hai field kaa, jis par apply karni hai condition
                $cond: {
                    if: {$eq: ["$city", "Lucknow"]},
                    then: "$$REMOVE",
                    else: "$city"
                }
            }
        }
    }
])    

^ OUTPUT:
    [
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            marks: [ 80, 89, 85, 92 ],
            city: 'Delhi',
            fullname: 'Prashant Tyagi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            marks: [ 75, 88, 90, 82 ],
            city: 'Mumbai',
            fullname: 'Anjali Mehta'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            marks: [ 65, 70, 68, 72 ],
            fullname: 'Rohan Singh'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            marks: [ 90, 93, 95, 97 ],
            city: 'Ahmedabad',
            fullname: 'Sneha Patel'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            marks: [ 55, 60, 58, 62 ],
            city: 'Bangalore',
            fullname: 'Amit Verma'
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            marks: [ 80, 78, 82, 91 ],
            city: null,
            fullname: 'Bhandari Singh'
        }
    ]


!-------------------------------------------------------------------------------------------------------------------------------------------

!Question: oopar jo marks wali array hai, main usmein ek or subject ke marks insert karna chahta hoon
Approach: aisa karne ke liye "$concatArrays" operator ka use karte hain, jo ki ek array accept karta hai and iss array ke andar
        2 parameters pass karte hain, first is "field-name" and second is "square brackets, i.e., array" and field kaa naam 
        woh daalte hain jiske andar humein new element insert karna hai, humare case mein "marks" naam ki array
        mein ek new element add karna hai, toh field kaa naam "$marks" ho jaayega and jo doosra parameter paas karna hai, usmein
        hum apna element pass karte hain.

^ CODE-4
~   db.users.aggregate([
~       {
~           $addFields: {
~               marks: {
~                   $concatArrays: ["$marks", [85]]
~               }
~           }
~       }
~   ])
    
--> neeche ab dekhenge toh fir marks wali array mein ab element '85' add ho gaya hai sabki array mein, agar kisi particular user ke 
    field mein add karna hota toh fir main "$match" operator kaa use karta, sabse pehle uss user ko filter out karta and then baaki kaa code
    wahi same rehta.
^ OUTPUT:
    [
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            firstname: 'Prashant',
            lastname: 'Tyagi',
            marks: [ 80, 89, 85, 92, 85 ],
            city: 'Delhi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            firstname: 'Anjali',
            lastname: 'Mehta',
            marks: [ 75, 88, 90, 82, 85 ],
            city: 'Mumbai'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            firstname: 'Rohan',
            lastname: 'Singh',
            marks: [ 65, 70, 68, 72, 85 ],
            city: 'Lucknow'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            firstname: 'Sneha',
            lastname: 'Patel',
            marks: [ 90, 93, 95, 97, 85 ],
            city: 'Ahmedabad'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            firstname: 'Amit',
            lastname: 'Verma',
            marks: [ 55, 60, 58, 62, 85 ],
            city: 'Bangalore'
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            firstname: 'Bhandari',
            lastname: 'Singh',
            marks: [ 80, 78, 82, 91, 85 ],
            city: null
        }
    ]


! Question: main chahta hoon ki "marks" wali array mein jitne bhi elements hain woh sab add ho jaaye
^ CODE-5
~   db.users.aggregate([
~       {
~           $addFields: {
~               totalMarks: {$sum: "$marks"}
~           }
~       }
~   ])

^ OUTPUT:
    [
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            firstname: 'Prashant',
            lastname: 'Tyagi',
            marks: [ 80, 89, 85, 92 ],
            city: 'Delhi',
            totalMarks: 346 // totalMarks kaa ek naya field add ho gaya hai and usmein total marks aa gaye hain jo marks wali array mein thay
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            firstname: 'Anjali',
            lastname: 'Mehta',
            marks: [ 75, 88, 90, 82 ],
            city: 'Mumbai',
            totalMarks: 335
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            firstname: 'Rohan',
            lastname: 'Singh',
            marks: [ 65, 70, 68, 72 ],
            city: 'Lucknow',
            totalMarks: 275
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            firstname: 'Sneha',
            lastname: 'Patel',
            marks: [ 90, 93, 95, 97 ],
            city: 'Ahmedabad',
            totalMarks: 375
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            firstname: 'Amit',
            lastname: 'Verma',
            marks: [ 55, 60, 58, 62 ],
            city: 'Bangalore',
            totalMarks: 235
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            firstname: 'Bhandari',
            lastname: 'Singh',
            marks: [ 80, 78, 82, 91 ],
            city: null,
            totalMarks: 331
        }
    ] 
        
    
! $unwind:--------------------------------------------------------------------------------------------------------------------------------- 
--> jab bhi humein array se elements ko bahar nikalna hota hai toh fir uske liye hum "$unwind" operator kaa use karte hain.

^ Agar main oopar jo sample data hai, usmein marks wali array par unwind operator lagaunga toh fir array ke saare elements bahar aa jaayenge and
^ fir jitne elements hain array ke andar, utne hi documents ban jaayenge, like prashant naam ke document mein marks ki array mein
^ 4 elemets hain, toh fir 4 documents create ho jaayenge har ek document mein ek-ek element hoga

^ CODE-6
~   db.users.aggregate([
~       {
~           $unwind: "$marks" // array kaa naam dena hai, humare case mein "marks" naam se hai array.
~       }
~   ])


^ OUTPUT:
    [
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            firstname: 'Prashant',
            lastname: 'Tyagi',
            marks: 80,
            city: 'Delhi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            firstname: 'Prashant',
            lastname: 'Tyagi',
            marks: 89,
            city: 'Delhi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            firstname: 'Prashant',
            lastname: 'Tyagi',
            marks: 85,
            city: 'Delhi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
            firstname: 'Prashant',
            lastname: 'Tyagi',
            marks: 92,
            city: 'Delhi'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            firstname: 'Anjali',
            lastname: 'Mehta',
            marks: 75,
            city: 'Mumbai'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            firstname: 'Anjali',
            lastname: 'Mehta',
            marks: 88,
            city: 'Mumbai'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            firstname: 'Anjali',
            lastname: 'Mehta',
            marks: 90,
            city: 'Mumbai'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
            firstname: 'Anjali',
            lastname: 'Mehta',
            marks: 82,
            city: 'Mumbai'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            firstname: 'Rohan',
            lastname: 'Singh',
            marks: 65,
            city: 'Lucknow'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            firstname: 'Rohan',
            lastname: 'Singh',
            marks: 70,
            city: 'Lucknow'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            firstname: 'Rohan',
            lastname: 'Singh',
            marks: 68,
            city: 'Lucknow'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
            firstname: 'Rohan',
            lastname: 'Singh',
            marks: 72,
            city: 'Lucknow'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            firstname: 'Sneha',
            lastname: 'Patel',
            marks: 90,
            city: 'Ahmedabad'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            firstname: 'Sneha',
            lastname: 'Patel',
            marks: 93,
            city: 'Ahmedabad'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            firstname: 'Sneha',
            lastname: 'Patel',
            marks: 95,
            city: 'Ahmedabad'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
            firstname: 'Sneha',
            lastname: 'Patel',
            marks: 97,
            city: 'Ahmedabad'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            firstname: 'Amit',
            lastname: 'Verma',
            marks: 55,
            city: 'Bangalore'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            firstname: 'Amit',
            lastname: 'Verma',
            marks: 60,
            city: 'Bangalore'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            firstname: 'Amit',
            lastname: 'Verma',
            marks: 58,
            city: 'Bangalore'
        },
        {
            _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
            firstname: 'Amit',
            lastname: 'Verma',
            marks: 62,
            city: 'Bangalore'
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            firstname: 'Bhandari',
            lastname: 'Singh',
            marks: 80,
            city: null
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            firstname: 'Bhandari',
            lastname: 'Singh',
            marks: 78,
            city: null
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            firstname: 'Bhandari',
            lastname: 'Singh',
            marks: 82,
            city: null
        },
        {
            _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
            firstname: 'Bhandari',
            lastname: 'Singh',
            marks: 91,
            city: null
        }
    ]
*/