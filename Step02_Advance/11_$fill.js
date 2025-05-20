/*
#=======================================================================================#
#                         MongoDB $fill Operator Example                                 #
#=======================================================================================#
*/

/*
* $fill operator ka use tab kiya jata hai jab humein missing values ko fill karna hota hai
* Ye operator time series data mein bahut useful hai
* Example: Stock prices, sensor readings, temperature data etc.
*/

// Sample dataset - Temperature readings har 2 ghante mein
db.temperatures.insertMany([
    { timestamp: ISODate("2024-01-01T00:00:00Z"), temp: 20 },
    { timestamp: ISODate("2024-01-01T02:00:00Z"), temp: null },  // missing value
    { timestamp: ISODate("2024-01-01T04:00:00Z"), temp: 22 },
    { timestamp: ISODate("2024-01-01T06:00:00Z"), temp: null },  // missing value
    { timestamp: ISODate("2024-01-01T08:00:00Z"), temp: 25 }
]);

/*
#----------------------------- $fill Operator Usage ----------------------------------#
* 1. sortBy: Kis field ke basis pe data sort karna hai
* 2. output: Kaunse field mein fill karna hai
* 3. method: Fill karne ka tareeka - linear ya locf (last observation carried forward)
*/

db.temperatures.aggregate([
    {
        $fill: {
            sortBy: { timestamp: 1 },  // timestamp ke hisaab se sort
            output: {
                temp: { method: "linear" }  // linear interpolation use karke fill
            }
        }
    }
]);

/*
! Important Notes:
* - 'linear' method: Dono known values ke beech mein equal distribution
* - 'locf' method: Last known value ko copy karta hai
* - sortBy field must be properly indexed for better performance
*/

/*
#-------------------------- Expected Output Example --------------------------------#
* { timestamp: ISODate("2024-01-01T00:00:00Z"), temp: 20 }
* { timestamp: ISODate("2024-01-01T02:00:00Z"), temp: 21 }  // linearly filled
* { timestamp: ISODate("2024-01-01T04:00:00Z"), temp: 22 }
* { timestamp: ISODate("2024-01-01T06:00:00Z"), temp: 23.5 }  // linearly filled
* { timestamp: ISODate("2024-01-01T08:00:00Z"), temp: 25 }
*/
I