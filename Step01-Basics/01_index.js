
/*
! Create database
--> use your-database-name
if already created database with that name then it will switch to that, otherwise create the database

! create collection
db.createCollection("user")

! Insert document inside the collection
db.user.insertOne({name: "prashant", age: 18})
db.user.insertMany([{name: "prashant", age: 18}, {name: "srk", age: 18}])

! Delete database
--> use your-database-name
--> db.dropDatabase()

! Delete collection
db.user.drop()

! Delete a single document
db.user.deleteOne({ name: "prashant" })

! Delete multiple documents
db.user.deleteMany({ age: 18 })
*/