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
! $addFields
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
*/