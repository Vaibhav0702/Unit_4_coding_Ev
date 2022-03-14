const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connect = () => {
    return mongoose.connect("mongodb+srv://Vaibhav_0702:Vaibhav_0702@cluster0.lzfpk.mongodb.net/Banking_System?retryWrites=true&w=majority")
};

app.use(express.json())
//-----------------------------------------------------------------Schemas

// ----------------UserSchema------

const UserSchema = new mongoose.Schema(
 
    {
        firstName : {type: String , required : true},
        middleName : {type: String , required : false},
        lastName :  {type: String , required : true},
        age : {type: String , required : true},
        email : {type: String , required : true, unique:true},
        address : {type: String , required : true},
        gender : {type: String , required : true , default:"Female"},
       
    },
    {
        
        timestamp :true,
        versionKey:false,
    }

);

const User = mongoose.model("user", UserSchema);

// ------------------------BranchDetail Schema------------



const BranchDetailSchema = new mongoose.Schema(

    {
        name : {type: String , required : true},
        address :  {type: String , required : true},
        IFSC : {type: String , required : true},
        MICR : {type: Number , required : true, unique:true},
        UserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        MasterAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "MasterAccount",
            required : true
        }
    
    },
    {
        versionKey:false,
        timestamp :true
    }

)

const BranchDetail = mongoose.model("BranchDetail",  BranchDetailSchema );


// ---------------------------MasterAccount Schema -----------



const MasterAccountSchema = new mongoose.Schema(

    {
        balance : {type: String , required : true},
        UserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        FixedAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "FixedAccount",
            required : true
        },
        SavingsAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SavingsAccount",
            required : true
        },
    },
    {
        versionKey:false,
        timestamp :true
    }

)

const MasterAccount = mongoose.model("MasterAccount",  MasterAccountSchema );

// ----------------------------SavingsAccountSchema ----------

const SavingsAccountSchema = new mongoose.Schema(

    {
        account_number  : {type: Number , required : true, unique:true},
        balance :  {type: Number , required : true},
        interestRate : {type: String , required : true},
        UserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        MasterAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "MasterAccount",
            required : true
        }
    },
    {
        versionKey:false,
        timestamp :true
    }

)

const SavingsAccount = mongoose.model("SavingsAccount", SavingsAccountSchema);

// ------------------------------FixedAccountSchema--------------

const FixedAccountSchema = new mongoose.Schema(

    {
        account_number  : {type: Number , required : true, unique:true},
        balance :  {type: Number , required : true},
        interestRate : {type: String , required : true},
        startDate : {type: Number , required : true},
        maturityDate : {type: Number , required : true},
        UserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        MasterAccountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "MasterAccount",
            required : true
        }
    },
    {  versionKey:false,
        timestamp :true
    }

)

const FixedAccount = mongoose.model("FixedAccount", FixedAccountSchema);



//-----------------------------------------------------------------CURD---

// ----user CRUD ----

app.get("/users",async(req,res)=>{

try{
    
    const users =await User.find().lean().exec();
    return res.status(200).send({users:users});
}
catch(err)
{
    return res.status(500).send({msg:err.message});
}
});


// ------------------

app.post("/users",async(req,res)=>{

    try{
        
        const users =await User.create(req.body);
        return res.status(200).send({users:users});
    }
    catch(err)
    {
        return res.status(500).send({msg:err.message});
    }
    });
// --------------

app.get("/users/:id",async(req,res)=>{

    try{
        
        const users =await User.findById(req.params.id).lean().exec();
        return res.status(200).send({users:users});
    }
    catch(err)
    {
        return res.status(500).send({msg:err.message});
    }
    });
    
// --------------------CRUD MAster Account 


app.get("/masteraccount",async(req,res)=>{

    try{
        
        const masteraccount =await MasterAccount.find().lean().exec();
        return res.status(200).send({masteraccount:masteraccount});
    }
    catch(err)
    {
        return res.status(500).send({msg:err.message});
    }
    });
    
    
    // ------------------
    
    app.post("/masteraccount",async(req,res)=>{
    
        try{
            
            const masteraccount =await MasterAccount.create(req.body);
            return res.status(200).send({masteraccount});
        }
        catch(err)
        {
            return res.status(500).send({msg:err.message});
        }
        });
    // --------------
    
    app.get("/masteraccount/:id",async(req,res)=>{
    
        try{
            
            const masteraccount =await  MasterAccount.findById(req.params.id).lean().exec();
            return res.status(200).send({masteraccount});
        }
        catch(err)
        {
            return res.status(500).send({msg:err.message});
        }
        });


// --------------------


// ------------------------------------------
app.listen(5000, async () => {

try{
    await connect();
    console.log("listen on 5000");
}
catch(err)
{
    console.log(err);
}
});