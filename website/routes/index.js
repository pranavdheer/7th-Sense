var express = require('express');
var router = express.Router();
var model = require("../models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var auth = require('../authentication/auth');
var upload = require("../multer/config").upload;
var apiai = require('apiai');
var fs = require("fs");

var app = apiai("f93462108ead4bc982b70cfb0850b55b");
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.user){
    res.redirect("/login");
  }
  else{
    console.log(req.user);
    res.render('indexTry');
  }
});



router.get("/login", (req, res) => {
  res.render("loginIndex",{hint:"login"});
})


router.get("/signup",(req,res)=>{
  res.render("loginIndex",{hint:"signup"});
})

router.post("/signup",(req,res)=>{
  model.createUser(req).
  then((response)=>{
    console.log("User signed up");
    // req.login({username:req.body.username, password:req.body.password}, function (err) {
    //   if (!err) {
    //     res.redirect('/');
    //     console.log("It worked : " + req.user);
    //   } else {
    //     res.redirect('/signup');
    //     console.log(err);
    //   }
    // })
    req.flash("info","Login with your credentials");
    res.redirect("/login");
  })
  .catch((err)=>{
    // res.json(err);
    req.flash("info", err.message);
    res.redirect("/signup");
  })
})

router.post("/login", passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login',failureFlash: true }));

router.post("/addStep", (req,res)=>{
  model.addStep(req). 
  then((response)=>{
    res.json(response);
  })
  .catch((err)=>{
    console.log(err);
    res.json(err);
  })
})


router.get("/upload",(req,res)=>{
  res.render("upload");
})

router.post("/upload",upload.single("file"), (req,res)=>{
  model.addData(req, req.file)
  .then((response)=>{
    res.json(response);
  })
  .catch((err)=>{
    res.json(err);
  })
})


router.get("/getSteps",(req,res)=>{
  res.json({data: req.user.steps})
})


router.get("/getPics", (req, res) => {
  var arr = req.user.data;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].type!="pic"){
      arr.splice(i, 1);
    }
  }
  res.json({ data: arr })
})

router.get("/getVideos", (req, res) => {
  var arr = req.user.data;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].type != "video") {
      arr.splice(i, 1);
    }
  }
  res.json({ data: arr })
})


router.get("/getAudios", (req, res) => {
  var arr = req.user.data;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].type != "audio") {
      arr.splice(i, 1);
    }
  }
  res.json({ data: arr })
})

router.get("/partitionData", (req,res)=>{
  var arr = req.user.data;
  out = {pic:0, audio:0, video:0};
  for (i=0;i<arr.length;i++){
    out[arr[i].type]+=parseFloat((parseFloat(arr[i].size)/parseFloat(1000000)).toPrecision(3));
    console.log(out[arr[i].type]);
  }
  res.json({data:out})
})

router.post("/check", (req,res)=>{
  msg = req.body.msg;  

  var request = app.textRequest(msg, {
    sessionId: Date.now()
  });

  request.on('response', function (response) {
    pic = response.result.parameters.pic;
    step = response.result.parameters.step;
    console.log(pic,step);
    if (pic.length>0){
      model.getRecentPic().
        then((r) => {
          res.send(r.message.substring(6));
        })
        .catch((err) => {
          console.log(err);
          res.send("Some error");
        })
    }
    else{
      model.totalNoOfSteps().
        then((r) => {
          res.send("Total no of steps are " + r.message);
        })
        .catch((err) => {
          res.send("Some error");
        })
    }
  });
  request.end();
})



router.post("/flag", (req, res) => {
  fs.writeFile('flag.txt', req.body.flag, (err) => {
    // throws an error, you could also catch it here
    if (err) throw res.send(err);
    fs.readFile('flag.txt', 'utf8', function (err, contents) {
      res.send(contents);
    });
    // success case, the file was saved

  });
})

router.get("/flag1", (req, res) => {
  res.status(200);
  fs.readFile('flag.txt', 'utf8', function (err, contents) {
    res.send(contents);
  });
})



module.exports = router;
