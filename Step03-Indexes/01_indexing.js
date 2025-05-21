/*
! Chalo bhayi shuru karte hain "indexing" concept.

--> Indexing kya hai basically humari searching speed ko badha deti hai, woh kaise ?
todo--> Pehle toh shuru se shuru karte hain, bina indexing ke kaise search hota hai yeh dekhenge, fir indexing kaise perofrmance increase karti hai woh dekhenge.

^-------------------------------------------------------------w/o Indexing----------------------------------------------------------------------

1. Toh jab bhi hum kisi specific document ko search karte hain collection ke andar, toh fir internal jo process hoti hai search karne ki
    woh saare documents ko check karta hai, suppose 1 lakh documents hain collection ke andar, toh mongodb kya karega ki 1 lakh documents
    ko one-by-one check karega, or jaise hi mil jaayega woh wala document, tab bhi poore documnets ko search karega, toh matlab
    total time complexity O(n) hogi, jo ki bhot zyada hai and performance bhot zyada kharab ho jaati hai jab bhot zyada laakhon mein
    doucments hote hain.

    db.user.find({email: "prashant@gmail.com"});
    yeh query collection mein jaake search karegi har ek document mein jaake, ki yeh wali mail id exist karti hai yaa nahin,
    and isko hum 'collscan' kehte hain i.e. 'collection scan', jo ki bhot bekaar tareeka hai.


^-------------------------------------------------------------with Indexing---------------------------------------------------------------------

1. Indexing basically hum kisi documents ke andar jo fields hain, unn par lagti hai, like mujhe email field par indexing lagani hai,
    name field par indexing lagani hai.

2. jiss field par indexing lagate hain, uss field ke liye ek B-Tree create hota hai jo ki ek data structure hai, and obviously 
    yeh cheez storage occupy karegi uss B-tree mein data jo store hoga, and yeh jo data store hota hai, woh ek sorted manner 
    mein hota hai like a sorted array of elements.

3. For example, hum indexing jo hai 'email' field par lagate hain, toh jab-jab koi nayi email create hogi, tab-tab yeh email
    uss B-Tree mein bhi store hogi and document mein yeh email toh obviously rahegi hi, and saari email ids sorted manner mein store
    hongi B-Tree ke andar i.e. tree mein nodes hoti hain, unke andar store hongi emails.
    
4. And har ek store email ke saath mein "pointer" bhi hota hai jo ki point karta hai document ko.
    For example ek document hai, see below:
    {
        _id: ObjectId(625a1832bbashcjza9jh),
        name: "Prashant",
        email: "prashant@google.com",
        age: 18,
        course: "B.Tech"
    }
    
    Suppose aise hi laakhon mein documents hain users ke and maine 'email' field par indexing laga di hai, toh ab kya hoga ki har ek
    user ki email id B-tree mein jaake store ho jaayegi node mein and laakhon email ids padi huyi hain bhit saare users ki uss B-Tree mein
    and remember yeh saari email ids sorted order mein stored hain and har ek email id ke paas pointer hai jo ki point karegi apne
    document ko.

    --> Toh ab suppose main search karunga "prashant@google.com", toh MongoDB dekhega ki "email" field par toh indexing lagi huyi hai,
    toh woh B-Tree ke paas jaayega and then first node ke check karega ("neeraj@gmail.com") but yeh "prashant@google.com" wali email
    nahin hai, fir dekhega ki email id "p" letter se shuru hai jisko search karna hai and abhi jo email mili hai neeraj wali
    woh toh "n" letter se shuru ho rahi hai, and 'p' jo hai 'n' letter se bada hai, toh fir right side wali node mein jaake search karega
    kyoki right side mein badi values hoti hain and left mein chhoti values hoti hain, toh ab right side wali node mein bhot saari email ids
    hain, toh right side wali node mein "Binary Search" lagegi, and as we know that binary search ki time complexity O(log n) hoti hai.
    Toh ab "prashant@google.com" wali email id mil jaayegi.

                    [neeraj@gmail.com]
                   /                 \
                 /                    \
[amit@gmail.com, dev@gmail.com]   [prashant@google.com, rohit@outlook.com, sumit@gmail.com, yash@gmail.com]


!Important:
5. As we know ki indexing jo hai storage leta hai memory mein, toh har ek field par indexing laga can be very costly, isliye kisi specific
    field par hi indexing apply karte hain.
*/






//!-----------------------------------------------------Summary Below or short note-----------------------------------------------------------









/*
! Chalo bhayi shuru karte hain "Indexing" concept.

--> Indexing kya hai? Yeh basically humari **searching speed** ko kaafi improve karta hai. Kaise? Chalo pehle bina indexing ke dekhte hain phir indexing ke saath.

^------------------------------------------------------------- w/o Indexing ---------------------------------------------------------------------

1. Jab hum kisi specific document ko search karte hain collection ke andar, MongoDB internally **har ek document ko one-by-one scan** karta hai.

    For example: agar 1 lakh documents hain aur hum query likhte hain:
    
    db.user.find({email: "prashant@gmail.com"});

    Toh MongoDB ek-ek document ko check karega email match ke liye, chahe match pehle hi mil jaaye. Isse bolte hain **collection scan** (i.e., "collscan").

    ⚠️ Is approach ki time complexity hoti hai **O(n)** – jo ki large datasets ke liye performance degrade karta hai.

^------------------------------------------------------------- with Indexing ---------------------------------------------------------------------

1. Indexing kisi specific **field** par lagti hai jaise `email`, `name`, etc.

2. Jab hum kisi field pe indexing lagate hain, toh MongoDB us field ke liye ek **B-Tree** data structure banata hai.
    - Is B-Tree mein saari values **sorted** hoti hain.
    - Har node ke saath ek **pointer** hota hai jo original document ko point karta hai.

3. Example: Hum `email` field pe indexing laga dete hain.

    Ab jab bhi naya document create hoga, uski `email` B-Tree mein sorted order mein insert ho jaayegi.

4. Ab agar hum query karte hain:
    
    db.user.find({email: "prashant@google.com"});

    Toh MongoDB sabse pehle check karega ki `email` field indexed hai ya nahi.
    - Agar indexed hai → B-Tree ke through **Binary Search** lagega.
    - Isse time complexity ho jaayegi **O(log n)**.

    Example Tree:
                    [neeraj@gmail.com]
                   /                 \
                 /                    \
[amit@gmail.com, dev@gmail.com]   [prashant@google.com, rohit@outlook.com, sumit@gmail.com, yash@gmail.com]

    Ab "prashant@google.com" ko directly uske pointer se access kar liya jaayega, bina poora collection scan kiye.

⚠️ Important Note:
5. Har indexing **memory consume** karti hai. Isliye blindly har field pe indexing nahi lagate – sirf un fields par lagate hain jinpar queries frequent hoti hain.
*/

