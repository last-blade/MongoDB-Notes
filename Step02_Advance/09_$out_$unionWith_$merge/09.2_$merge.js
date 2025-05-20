/*
--> See the "09.2_$merge example.jpg" image, uss image mein basically 2 collections hain and unn dono collections ko merge kar ke ek
    new collection mein daal diya hai dono kaa data on the basis of "_id" field, kyoki dono collections mein common field
    '_id' hi hai.

^ Syntax: 4 fields accept karta hai merge operator. 
    db.collection_name.aggregate([
        {
            $merge: {
                to: "students", 
                on: "_id",
                whenMatched: "merge",
                whenNotMatched: "insert",
            }
        }
    ])
        
1. to: iss field collection kaa naam daalna hota hai jisse hum marge karna chahte hain
2. dono mein jo common field hai uske basis par merge kara rahe hain 2 collections ko, toh uss common field kaa naam fill karna hota hai
3. whenMatched: yahan par operation kaa naam pass karna hai, kya operation karna hai, mujhe 'merge' karna hai, or bhi options hote hain, 
                like 'replace', 'keepExisting', 'fail'.
                
4. whenNotMatched: hum jo merge kar rahe hain 2 collection ko, woh hum _id ke basis par kar rahe hain, agar suppose koi _id hai jo extra hai
                    kisi collection ke andar, yaa fir exist nahin karti hai, toh toh wahan par match hi nahin ho paayegi _id jo hai.
                    Toh aise case mein hum chahenge ki jo match nahin ho paaya hai document, usko bhi tum add kardo mergeed collection
                    ke andar, toh uske liye hum 'insert' value pass karte hain.
                    
                    Aise hi or bhi options hain like 'insert', 'discard', and 'fail'. 
*/