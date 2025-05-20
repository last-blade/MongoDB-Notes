// SALES sample data
sales: [
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd0'),
    product: 'tablet',
    price: 20000,
    quantity: 8,
    region: 'north'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd1'),
    product: 'mobile',
    price: 15000,
    quantity: 7,
    region: 'south'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd2'),
    product: 'smartwatch',
    price: 7000,
    quantity: 12,
    region: 'north'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd3'),
    product: 'headphones',
    price: 2900,
    quantity: 13,
    region: 'west'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd4'),
    product: 'laptop',
    price: 55000,
    quantity: 5,
    region: 'east'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd5'),
    product: 'mobile',
    price: 15000,
    quantity: 10,
    region: 'north'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd6'),
    product: 'smartwatch',
    price: 6800,
    quantity: 11,
    region: 'east'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd7'),
    product: 'headphones',
    price: 3000,
    quantity: 15,
    region: 'east'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd8'),
    product: 'laptop',
    price: 54000,
    quantity: 6,
    region: 'west'
  },
  {
    _id: ObjectId('682c3b031d4ef889e06c4bd9'),
    product: 'tablet',
    price: 21000,
    quantity: 9,
    region: 'south'
  }
]
//-------------------------------------------------------------------------------------------------------------------------------------------


/*
! $facet:

--> $facet ek bahut powerful operator hai jo multiple aggregation pipelines ko ek saath process karne mein help karta hai. 
--> Isse hum ek hi query mein alag-alag calculations kar sakte hain.

--> facet ke andar hum miltiple arrays de sakte hain and unn arrays ke andar hum apne operators kaa use karte hain jaise as 
    ususally hum karte hain, and array kaa name kuch bhi de sakte hain hum.

    $facet: {
        totalStudents: [
            -> ab yahan par normally koi bhi operator use kart sakte, group, count, sum, etc. or fir woh data jo aayega array mein aayega jo humne naam diya hai 'totalStudents', zyada rocket science nahin.
        ]
    }

^ Kab use karein:
1. Jab aapko ek hi data se multiple results chahiye ho
2. Jab aapko analytics dashboard banana ho
3. Jab aapko pagination + total count dono ek saath chahiye ho

!Example:-1
--> suppose mujhe total sales nikalni hai kisi "product" ki  and then sorting karni hai descneding order mein jiski zyada sales hain woh 
    oopar show ho, and top-3 documnets hi show karane hain. 

    todo--> sabse pehle bina "$facet" operator ke karenge, and then "$facet" kaa use karke karenge solve.

^ CODE-1
~    db.sales.aggregate([
~        {
~            $group: {
~                _id: "$product",
~                totalSales: {
~                    $sum: {
~                        $multiply: ["$price", "$quantity"]
~                    }
~                }
~            }
~        },
~
~        {
~            $sort: {totalSales: -1}
~        },
~
~        {
~            $limit: 3
~        },
~    ])

^ OUTPUT:
    [
        { _id: 'laptop', totalSales: 599000 },
        { _id: 'tablet', totalSales: 349000 },
        { _id: 'mobile', totalSales: 255000 }
    ]

    todo--> ab oopar wala kaam facet kaa use karke karenge
    db.sales.aggregate([
        {
            $facet: {
                topProducts: [
                    {
                        $group: {
                            _id: "$product",
                            topProducts: {
                                $sum: {$multiply: ["$quantity", "$price"]}
                            }
                        }
                    },

                    {$sort: {topProducts: -1}},

                    {$limit: 3}
                ],

                totalRevenue: [  //yahan par hum extra kaam kar rahe hain, total sales kaa profit nikal rahe hain, baaki jo oopar wala code hai, usmein hi humne poora code likh diya tha bina facet wale kaa
                    {
                        $group: {
                            _id: null,
                            totalRevenue: {
                                $sum: {
                                    $multiply: ["$quantity", "$price"]
                                }
                            }
                        }
                    }
                ]

            }
        }
    ])

^ OUTPUT:
[
    {
        topProducts: [
            { _id: 'laptop', topProducts: 599000 },
            { _id: 'tablet', topProducts: 349000 },
            { _id: 'mobile', topProducts: 255000 }
        ],

        totalRevenue: [ { _id: null, totalRevenue: 1444500 } ]
    }
]    


!Example:-2
db.products.aggregate([
    {
        $facet: {
            "totalProducts": [
                { $count: "total" }
            ],
            "categorizedProducts": [
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ],
            "paginatedResults": [
                { $skip: 0 },
                { $limit: 10 }
            ]
        }
    }
])

Is example mein, ek hi query se hum:
- Total products count
- Category-wise count
- First 10 products

Teeno results ek saath mil jayenge!



*/