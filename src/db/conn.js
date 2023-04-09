const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/acad').then(()=>{
        console.log("connected to mongodb");
    }).catch((err)=>{
        console.log(err);
    })
}