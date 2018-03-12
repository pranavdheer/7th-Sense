var mongoose = require("mongoose");
var user = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    steps:[],
    data:[]
})


var User = mongoose.model("User", user);
exports.User = User;

exports.createUser = (req)=>{
    
    return new Promise((resolve, reject)=>{
        if (!req.body.username || !req.body.password){
            console.log("A0");
            reject({status:-1, message:"Provide details"});
        }
        
        User.findOne({ username: req.body.username }).exec((error, user)=>{
            if (!error && user){
                console.log("A1");
                reject({status:-1, message:"Username Taken"})
            }
            else if (error){
                console.log("A2");
                reject({status:-1, message:error});
            }
            else{
                console.log("A2");
                var newUser = new User({
                    username: req.body. username,
                    password: req.body.password
                })
                newUser.save((err, u)=>{
                    if (!err && u){
                        resolve({status:2,message:"User Signed Up"});
                    }
                    else{
                        reject({status:-1, message:err});
                    }
                })
            }
        })
        console.log("ends");
    })  
}


exports.addStep = (req)=>{
    return new Promise((resolve, reject)=>{
        if (!req.body.count ){
            reject({ status: -1, message: "Provide details" });
        }
        //TODO// User.findById(req.user._id).exec((err, user )=>{
        User.findById(req.body.id).exec((err, user) => {
            if (!user || err){
                console.log(err);
                reject({status:-1, message:"No such user found"});
            }
            else{
                var item = {count:req.body.count,distance:req.body.distance, date:Date.now()};
                User.findByIdAndUpdate(req.body.id, {$push:{steps:item}}, {new: true}).exec((err, s)=>{
                    if (err|| !s){
                        console.log(err);
                        reject({status:-1, message:err});
                    }
                    else{
                        resolve({status:2,message:"Updated at"+req.body.date});
                    }
                })
            }
        })
    })
}



exports.addData = (req,data) => {
    return new Promise((resolve, reject) => {
        //TODO// User.findById(req.user._id).exec((err, user )=>{
        User.findById(req.body.id).exec((err, user) => {
            if (!user || err) {
                console.log(err);
                reject({ status: -1, message: "No such user found" });
            }
            else {
                var item = { path:data.path, type:req.body.type, date:Date.now(), size:data.size};
                if (req.body.class){
                    item["class"] = req.body.class;
                }
                User.findByIdAndUpdate(req.body.id, { $push: { data: item } }, { new: true }).exec((err, s) => {
                    if (err || !s) {
                        console.log(err);
                        reject({ status: -1, message: err });
                    }
                    else {
                        resolve({ status: 2, message: "Uploaded at" + item.date });
                    }
                })
            }
        })
    })
}


exports.totalNoOfSteps = ()=>{
    return new Promise((resolve, reject)=>{
        User.findOne({ username: "lakapoor777" }).exec((err, data) => {
            if (err || !data){
                reject({status:-1, message:err});
            }
            else{
                var arr = data.steps;
                var c = 0;
                for (i=0;i<arr.length;i++){
                    c+=parseInt(arr[i].count);
                }
                resolve({status:1, message:c});
            }
        })
    }) 
}



exports.getRecentPic = () => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: "lakapoor777" }).exec((err, data) => {
            if (err || !data) {
                reject({ status: -1, message: err });
            }
            else {
                var arr = data.data;
                var c = 0;
                max = arr[0].date;
                index = 0;
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].date>=max){
                        index = i;
                    }
                    if (i==arr.length-1){
                        resolve({ status: 1, message: arr[index].path });
                    }
                }
               
            }
        })
    })
}