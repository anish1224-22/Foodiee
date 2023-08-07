const mongoose = require('mongoose');
const mongoURI="mongodb+srv://foodiee:foodiee123@cluster0.qqbg9xx.mongodb.net/Foodiee?retryWrites=true&w=majority";
const mongoDB = async () => {
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err)console.log("---",console.error)
        else{
            console.log("Connected Successfully");
            const fetched_data= await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err){console.log(err);}
                else 
                {
                    global.food_items = data;
                    global.foodCategory = catData;
                }
                }
                )
            })
        }
    })
};
  
module.exports = mongoDB;

