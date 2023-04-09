const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    program:{
        type:String
    },
    batch:{
        type:Number
    },
    tuition:{
        type:Number
    },
    hostel:{
        type:Number
    },
    mess:{
        type:Number
    },
    library:{
        type:Number
    },
    transactionId:{
        type:String
    },
    notrx:{
        type:Number
    },
    data:{
        type:String
    },
    review:{
        type:String
    }
});

const upload = new mongoose.model("upload",uploadSchema);

module.exports= upload;