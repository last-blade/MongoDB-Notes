/*
--> "$bucket" and "$bucketAuto", yeh dono operators basically "$group" operator ki tarah grouping ke kaam hi aate hain, but yeh dono
    kewal numeric data ki grouping ke kaam aate hain.

--> jaise ki main 50-70 ke beech ki age wale students ki grouping kar sakta hoon, i.e. 50-70 ke beech kaun-kaun students hain and fir
    main kuc operation bhi perform kar sakta hoon like counting ki kitne students hain, etc.
! $bucket-----------------------------------------------------------------------------------------------------------------------------------
^ Syntax: 
    db.students.aggregate([
        $bucket: {
            groupBy: "kis field se grouping karni hai, yahan uss field kaa naam aayega $ sign kaa use karte huye and remember, numeric value honi chahiye uss field mein"
            boundaries: [yahan par array mein ranges dete hain hum, like 22, 30 iska matlab 22 se 30 ki range mein grouping hogi]
            default: "Other" // yahan par woh wale students aa jaayenge jinki humne grouping nahin ki hai, like 0-22 ki age ke beech ke students
            output: {
                totalStudentsCount: {$sum: 1} // output field ke andar hum arithmetic operations karte hain
            }  
        }
    ])
        
^ CODE-1
~   db.students.aggregate([
~       {
~           $bucket: {
~               groupBy: "$age",
~               boundaries: [22, 30],
~               default: "otherStudents",
~               output: { //yeh wala field nahin denge tab bhi by-default counting karke dega yeh "$bucket" operator, toh apni marzi hai.
~                   totalStudents: {$sum: 1}
~               }
~           }
~       }
~   ])   
    
^ OUTPUT:
    [
        { _id: 22, totalStudents: 5 }, // jinki age 22-30 ke beech hai, woh 5 students hain, and baaki ke bache huye studnets neeche hain
        { _id: 'otherStudents', totalStudents: 6 } // baaki ke bache huye students
    ]


^ CODE-2
~   db.students.aggregate([
~       {
~           $bucket: {
~               groupBy: "$age",
~               boundaries: [18, 20, 22, 25], // 18 se 20 ki umar ke bachche, 20 se 22 ki umar ke bachche, and 22 se 25 ki umar ke bachche group honge
~               default: "otherStudents",
~               output: {
~                   totalStudents: {$sum: 1}
~               }
~           }
~       }
~   ])    
    
^ OUTPUT:
    [
        { _id: 18, totalStudents: 2 }, // 18 se 20 ki age ke bachche 2 hi hain
        { _id: 20, totalStudents: 4 }, // 20 se 22 ki age ke bachche 4 hain
        { _id: 22, totalStudents: 5 } // 22 se 25 ki umar ke bachche 5 hain
    ]

    "otherStudents" wale field mein kuch bhi nahin aaya, kyoki saare students jo hain oopar di huyi range mein lie karte hain.

 
! $bucketAuto---------------------------------------------------------------------------------------------------------------------------------
--> iss operator mein kewal 3 field dene hote hain, 1. groupBy 2. buckets 3. output(yeh wala field optional hai)
--> groupBy: iss field mein woh wala numeric field pass karna hota hai jisse grouping karni hai
--> buckets: ismein numeric value daalni hoti hai i.e. 1,2,3,....n and suppose maine 5 value dedi bucket ki, toh fir "$bucketAuto" jo hai
            automatically 5 ranges bana dega like 20-22 tak ki umar ke students, 22-24, etc upto 5 range bana dega apne aap. And yeh jo hai
            sabse kam age wali value se leke maximum age wali value ko check karta hai, and then ranges define karta hai max and min
            value ke beech ki.
-->output: same jaise oopar output field hai or usmein arithemtic operations kar sakte hain, same wahi hai.            
^ CODE-4
~   db.students.aggregate([
~       {
~           $bucketAuto: {
~               groupBy: "$age",
~               buckets: 4
~           }
~       }
~   ])
    
^ OUTPUT:
    [
        { _id: { min: 19, max: 21 }, count: 4 },
        { _id: { min: 21, max: 23 }, count: 3 },
        { _id: { min: 23, max: 24 }, count: 4 }
    ]
--> maine toh 4 buckets i.e. 4 ranges di thi, lekin yahan oopar toh bas 3 ranges hi show ho rahi hain output mein, wo isliye kyoki itni
    hi possible thi ranges jab bucket ki value 4 dete hain toh, that's why 3 hi bani.

!--> lekin jab bucket ki value 5 di toh fir 5 ranges ban gayi, see below code's output
^ CODE-5
~   db.students.aggregate([
~       {
~           $bucketAuto: {
~               groupBy: "$age",
~               buckets: 5
~           }
~       }
~   ])

^ OUTPUT:
    [
        { _id: { min: 19, max: 20 }, count: 2 },
        { _id: { min: 20, max: 21 }, count: 2 },
        { _id: { min: 21, max: 22 }, count: 2 },
        { _id: { min: 22, max: 24 }, count: 2 },
        { _id: { min: 24, max: 24 }, count: 3 }
    ]


^ CODE-6
   db.students.aggregate([
       {
           $bucketAuto: {
               groupBy: "$age",
               buckets: 5,
                output: {
                    totalStud: {$sum: 1},
                    average_age: {$avg: "$age"},
                    totalAge: {$sum: "$age"}
                }
           }
       }
    ]) 
       
^ OUTPUT:
    [
        {
            _id: { min: 19, max: 20 },
            totalStud: 2,
            average_age: 19,
            totalAge: 38
        },
        {
            _id: { min: 20, max: 21 },
            totalStud: 2,
            average_age: 20,
            totalAge: 40
        },
        {
            _id: { min: 21, max: 22 },
            totalStud: 2,
            average_age: 21,
            totalAge: 42
        },
        {
            _id: { min: 22, max: 24 },
            totalStud: 2,
            average_age: 22.5,
            totalAge: 45
        },
        {
            _id: { min: 24, max: 24 },
            totalStud: 3,
            average_age: 24,
            totalAge: 72
        }
    ]
*/