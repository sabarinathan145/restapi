require("dotenv").config();
const express = require("express");
//connection moongose db
const connectDB = require("./connection");

const userModel = require("./user");
const app = express();

//configuration
app.use(express.json());


//route: /
//description : To get all user
// parameter : none

app.get("/",async (req, res) => {
    try{const user = await userModel.find();
        return res.json({ user });
    } 
        catch(error){
            return res.status(500).json({error : error.message});
        }

});

//route: user/type/:type
//description : To get user based on the type 
// parameter : type
app.get("/user/type/:type",async(req,res) => {
    try{
        const { type } = req.params;
        const user = await userModel.find({usertype : type});
    
        if (!user){
            return res.json({message : "no user found"});
        }
        return res.json({user});
    } catch(error){
        return res.status(500).json({error : error.message}); 
    }
  
});

//route: user/:_id
//description : To get the user based on the id 
// parameter : _id
app.get("/user/:_id",async(req,res) => {
    try{
        const { _id }= req.params;
        const user =await  userModel.findById({_id});
    
        if (!user){
            return res.json({message : "no user found"});
        }
        return res.json({user});
    } catch(error){
        return res.status(500).json({error : error.message}); 
    }
  

});

//route: user/new
//description : To post the user details or add new user    
// parameter : none
// request body : user object
app.post("/user/new",async (req, res) => {
    try{
        const { newUser } = req.body;
        await userModel.create(newUser);
        return res.json({ message : "user created" });
    } catch(error){
        return res.status(500).json({error : error.message}); 
    }
   
});

//route: user/update/_id 
//description : To post the user details or add new user    
// parameter : none
//request body :  user object
app.put("/user/update/:_id",async (req, res) => {
    try{
        const { _id } = req.params;
        const { userData } = req.body;
    
        const updateUser = await userModel.findByIdAndUpdate(
            _id,
            { $set :userData },
            {new : true}
            );
            return res.json({user: updateUser});
    } catch(error){
        return res.status(500).json({error : error.message}); 
    }
   
});
//route: user/delete/:_id 
//description : To post the user details or add new user    
// parameter : _id
app.delete("/user/delete/:_id",async (req, res) => {
    try{
        const { _id } = req.params;
        await userModel.findByIdAndDelete(_id);
    
            return res.json({message: "user deleted"});
    } catch(error){
        return res.status(500).json({error : error.message}); 
    }

   
});
//route: /user/delete/type/:usertypeN
//description : To post the user details or add new user    
// parameter : userType
app.delete("/user/delete/type/:usertype",async (req, res) => {
    try{
        const { usertype } = req.params;
        await userModel.findOneAndDelete({usertype});
    
            return res.json({message: "user deleted"});
    } catch(error){
        return res.status(500).json({error : error.message}); 
    }

   
});

app.listen( process.env.PORT, ()=> 
    connectDB().then((data) => console.log("server is running"))
    .catch((error)=> console.log(error)) 
);
