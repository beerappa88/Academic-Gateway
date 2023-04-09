const express = require("express");
const path = require("path");
require("./db/conn");
// const Student = require("./models/student");
const Student = require("./models/student");
// const tuition = require("./models/tuition");
const tuition = require("./models/tuition");
const hostel = require("./models/hostel");
const mess = require("./models/mess");
const library = require("./models/library");
const login = require("./models/login");
const upload = require("./models/Studentupdatedetails");
// const multer = require("multer");
const adminlogin = require("./models/adminlogin");

const app = express();
const hbs = require("hbs");
const async = require("hbs/lib/async");
const { default: mongoose } = require("mongoose");
// const mess = require("./models/mess");
// const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;

//setting the path
const staticpath = path.join(__dirname, "../public/css");
const templatepath = path.join(__dirname, "../templates/views");
// console.log(path.join(__dirname,'../public'));

// //middleware
// app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", templatepath);
// hbs.registerPartials(partialpath);
app.use(express.urlencoded({ extended: false }));

//routing
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", async (req, res) => {
  try {
    // const check = await login.findOne({ rollno: req.body.rollno });
    const rollno = req.body.rollno;
    const password = req.body.password;
    const check = await Student.findOne({ rollno: rollno });
    if (check.password == password) {
      res.render("studentprofile", { student: check });
    } else {
      res.redirect("/wrongpass");
    }
  } catch {
    res.redirect("/wrongpass");
  }
});

app.get("/wrongpass", (req, res) => {
  res.render("wrongpass");
});

// app.post("/wrongpass", async (req, res) => {
//   try {
//     //   const check = await login.findOne({ rollno: req.body.rollno });
//     //   if (check.password == req.body.password) {
//     //     const dataString = encodeURIComponent(JSON.stringify(check));
//     //     res.redirect(`/studentprofile?data=${dataString}`);
//     //     // res.redirect(`/studentprofile?data=${encodeURIComponent(JSON.stringify(check))}`);
//     //   } else {
//     //     res.redirect("/wrongpass");
//     //   }
//     // } catch {
//     //   res.send("wrong credentials");
//     // }
//     const check = await login.findOne({ rollno: req.body.rollno });
//     if (check.password == req.body.password) {
//       const data = {
//         rollno: check.rollno,
//       };
//       const studata = await Student.findOne(data);
//       const dataString = encodeURIComponent(JSON.stringify(studata));
//       // res.redirect(`/studentprofile?data=${dataString}`);
//       res.redirect(`/studentprofile?data=${dataString}`);
//       // res.render("studentprofile",{user: studata});
//     } else {
//       res.redirect("/wrongpass");
//     }
//   } catch {
//     res.redirect("/wrongpass");
//   }
// });

// app.get("/studentprofile", async (req, res) => {
//   // if (req.query.data) {
//     const dataString = decodeURIComponent(req.query.data);
//     // const check = JSON.parse(dataString);
//     const studata = JSON.parse(dataString);
//     // res.send(check);

//     // const data = {
//     //   rollno: check.rollno,
//     // };
//     // res.send(await Student.findOne(data));
//     // const studata = await Student.findOne(data);
//     if (studata) {
//       // req.session.user = studata;
//       // res.send(studata)
//       res.render("studentprofile", { studata });
//       // res.redirect("/studentprofile");
//     } else {
//       res.redirect("/wrongpass");
//     }
//   // } else
//   // res.render("studentprofile");
// });

// app.post("/studentprofile",(req,res)=>{

// })

app.get("/studentprofile/:rollno", async (req, res) => {
  // const dataString = decodeURIComponent(req.query.data);
  // const studata = JSON.parse(dataString);
  // const studata = JSON.parse(dataString);

  // const data = {
  //   rollno: check.rollno,
  // };
  // const studata = await Student.findOne(data);
  // const data = req.query.data;
  // const obj = JSON.parse(decodeURIComponent(data));
  // res.render("tuitionFee", { user: obj });

  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });
  res.render("studentprofile", { student: check });
  // res.render("tuitionFee");
});

app.get("/tuitionFee/:rollno", async (req, res) => {
  // const dataString = decodeURIComponent(req.query.data);
  // const studata = JSON.parse(dataString);
  // const studata = JSON.parse(dataString);

  // const data = {
  //   rollno: check.rollno,
  // };
  // const studata = await Student.findOne(data);
  // const data = req.query.data;
  // const obj = JSON.parse(decodeURIComponent(data));
  // res.render("tuitionFee", { user: obj });

  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });
  const tuitdata = await tuition.findOne({ rollno: rollno });
  // console.log(tuitdata);
  res.render("tuitionFee", { student: check, tuit: tuitdata });
});

app.get("/hostelRent/:rollno", async (req, res) => {
  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });
  const hosteldata = await hostel.findOne({ rollno: rollno });
  // console.log(hosteldata);
  res.render("hostelRent", { student: check, hostel: hosteldata });
});

app.get("/totalBill/:rollno", async (req, res) => {
  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });

  const tuitdata = await tuition.findOne({ rollno: rollno });
  const hosteldata = await hostel.findOne({ rollno: rollno });
  const messdata = await mess.findOne({ rollno: rollno });
  const librarydata = await library.findOne({ rollno: rollno });

  // console.log(tuitdata.totalTuitionFee);
  // console.log(hosteldata);
  // console.log(messdata);
  // console.log(librarydata);
  // const totalFee =
  //   tuitdata.totalTuitionFee +
  //   hosteldata.totalhostelFee +
  //   messdata.totalmessFee +
  //   librarydata.totallibraryFee;
  // const totalPaid =
  //   tuitdata.tuitionPaid +
  //   hosteldata.hostelPaid +
  //   messdata.messPaid +
  //   librarydata.libraryPaid;
  // const totalDues =
  //   tuitdata.tuitionDues +
  //   hosteldata.hostelDues +
  //   messdata.messDues +
  //   librarydata.libraryDues;

  res.render("totalBill", {
    student: check,
    tuitdata,
    hosteldata,
    messdata,
    librarydata,
  });
});

app.get("/messFee/:rollno", async (req, res) => {
  // const dataString = decodeURIComponent(req.query.data);
  // const studata = JSON.parse(dataString);

  // const data = {
  //   rollno: check.rollno,
  // };
  // const studata = await Student.findOne(data);
  // const data = req.query.data;
  // const obj = JSON.parse(decodeURIComponent(data));
  // res.render("messFee", { studata });
  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });
  const messdata = await mess.findOne({ rollno: rollno });
  // console.log(messdata);
  res.render("messFee", { student: check, mess: messdata });
});

app.get("/libraryDues/:rollno", async (req, res) => {
  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });
  const librarydata = await library.findOne({ rollno: rollno });
  // console.log(librarydata);
  res.render("libraryDues", { student: check, library: librarydata });
});

app.get("/Studentupdatedetails/:rollno", async (req, res) => {
  // const dataString = decodeURIComponent(req.query.data);
  // const studata = JSON.parse(dataString);

  // const data = {
  //   rollno: check.rollno,
  // };
  // const studata = await Student.findOne(data);
  // const data = req.query.data;
  // const obj = JSON.parse(decodeURIComponent(data));
  // res.render("Studentupdatedetails", { studata });
  const rollno = req.params.rollno;
  const check = await Student.findOne({ rollno: rollno });
  res.render("Studentupdatedetails", { student: check });
});

// const storage = multer.memoryStorage();
// const uploadpdf = multer({ storage: storage });
app.post("/Studentupdatedetails", async (req, res) => {
  const Studentdata = {
    name: req.body.name,
    rollno: req.body.rollno,
    email: req.body.email,
    phone: req.body.phone,
    batch: req.body.batch,
    program: req.body.program,
    tuition: req.body.tuition,
    hostel: req.body.hostel,
    mess: req.body.mess,
    library: req.body.library,
    transactionId: req.body.transactionId,
    notrx: req.body.notrx,
    data: req.body.data,
    review: req.body.review,
  };

  await upload.insertMany([Studentdata]);
  res.redirect("/Studentupdatedetails");
});

//////////////////////////////////////////////////////////////////////////
//admin profile
app.get("/adminlogin", (req, res) => {
  res.render("adminlogin");
});
app.post("/adminlogin", async (req, res) => {
  try {
    // console.log(req.body.username);
    // console.log(req.body.password);
    username = req.body.username;
    password = req.body.password;
    const check = await adminlogin.findOne({ username: username });
    // console.log(check);
    if (check.password == password) {
      res.redirect("/adminhome");
      // } else {
      //   res.redirect("/wrongpass");
    }
  } catch {
    res.redirect("/wrongpass");
  }

  // add users to login
  // const addadmin = {
  //   username: req.body.username,
  //   password: req.body.password,
  // };

  // await adminlogin.insertMany([addadmin]);
  // res.redirect("/adminlogin");
  // res.send("abvd")
});

app.get("/adminhome", async (req, res) => {
  // const name = req.params.username;
  // const admin = await adminlogin.findOne({username:name});
  res.render("adminhome");
});

app.post("/adminhome", async (req, res) => {
  const search = req.body.rollno;
  const studata = await Student.findOne({ rollno: search });
  if (studata) {
    res.render("adminhome", { studata: studata });
  }
});

// app.post("/adminhome", async (req, res) => {
//   // const searchrollno = req.body.rollno;
//   const searchdata = await Student.findOne({ rollno: req.body.rollno });
//   const dataString = encodeURIComponent(JSON.stringify(studata));
//   res.redirect(`/adminhome?data=${dataString}`);
// });

// app.get("/adminhome", (req, res) => {
//   if (req.query.data) {
//     res.render("adminhome", { studata });
//     const dataString = decodeURIComponent(req.query.data);
//     const studata = JSON.parse(dataString);
//   } else res.render("adminhome");
// });

app.get("/addRemove", (req, res) => {
  res.render("addRemove");
});
// add student page

app.post("/addRemove", async (req, res) => {
  const Studentdata = {
    name: req.body.name,
    rollno: req.body.rollno,
    email: req.body.email,
    phone: req.body.phone,
    branch: req.body.branch,
    batch: req.body.batch,
    programme: req.body.programme,
    password: req.body.rollno,
  };

  // const name = req.body.name;
  const batch = req.body.batch;
  const branch = req.body.branch;
  let totalTuitionFee;
  const programme = req.body.programme;
  if (programme == "BTech" || programme == "Btech" || programme == "btech") {
    if (batch == 2023 || batch == 2024) totalTuitionFee = 112500;
    else totalTuitionFee = 125000;
  } else {
    if ((programme == "MTech", programme == "Mtech", programme == "btech")) {
      if (branch == "CSE") totalTuitionFee = 100000;
      else totalTuitionFee = 75000;
    } else {
      if (programme == "PHD" || programme == "Phd") totalTuitionFee = 5000;
    }
  }

  const totalHostelFee = 12500;
  const totalMessFee = 4000;

  const tuitiondata = {
    rollno: req.body.rollno,
    tuitionPaid: req.body.tuitionPaid,
    totalTuitionFee: totalTuitionFee,
    tuitionDues: totalTuitionFee - req.body.tuitionPaid,
  };

  const hosteldata = {
    rollno: req.body.rollno,
    hostelPaid: req.body.hostelPaid,
    totalhostelFee: totalHostelFee,
    hostelDues: totalHostelFee - req.body.hostelPaid,
  };
  const messdata = {
    rollno: req.body.rollno,
    messPaid: req.body.messPaid,
    totalmessFee: totalMessFee,
    messDues: totalMessFee - req.body.messPaid,
  };
  const librarydata = {
    rollno: req.body.rollno,
    totallibraryFee: req.body.totallibraryFee,
    libraryDuesPaid: req.body.totallibraryFee - req.body.libraryPaid,
  };

  await Student.insertMany([Studentdata]);
  await tuition.insertMany([tuitiondata]);
  await hostel.insertMany([hosteldata]);
  await mess.insertMany([messdata]);
  await library.insertMany([librarydata]);
  // await login.insertMany([logindata]);
  res.redirect("/addRemove");
});

// app.get("/addRemove",(req,res)=>{
//   res.render("addRemove");
//   })

app.get("/searchBatch", (req, res) => {
  res.render("searchBatch");
});

app.post("/searchBatch", async (req, res) => {
  const search = req.body.batch;
  const studata = await Student.find({ batch: search }).sort({ rollno: 1 });
  res.render("searchBatch", { students: studata });
  // res.send(studata);
});

app.get("/verify", (req, res) => {
  res.render("verify");
});

app.get("/updateEntry", async (req, res) => {
  // const searchBy = req.body.keyword;

  // let searchQuery = {};
  // if (searchBy === "rollno") {
  //   searchQuery = { rollno: searchTerm };
  // } else if (searchBy === "name") {
  //   searchQuery = { name: searchTerm };
  // }
  // const studata = await Student.find(searchQuery).sort({ rollno: 1 });
  // // res.send(searchQuery);
  // console.log(searchBy);
  // // res.render("searchBatch", { students: studata });
  res.render("updateEntry");
});

app.post("/updateEntry", async (req, res) => {
  const search = req.body.rollno;
  const studata = await Student.findOne({ rollno: search });
  if (studata) {
    res.render("adminhome", { studata: studata });
  }
});

app.get("/updateBatch", (req, res) => {
  res.render("updateBatch");
});
app.get("/analytics", async (req, res) => {
  // const studata2020 = await tuition
  //   .find({ rollno: { $regex: /^20/ } });
  // const studata2020 = await Student.find({ batch: /20.*/ }).sort({ rollno: 1 });
  // const studata2021 = await Student.find({ batch: /21.*/ }).sort({ rollno: 1 });
  // const studata2022 = await Student.find({ batch: /22.*/ }).sort({ rollno: 1 });


  const result = await tuition.aggregate([
    {
      $match: {
        rollno: {
          $regex: /^20/,
          $not: {
            $regex: /[^0-9]/,
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalTuitionFee: { $sum: '$totalTuitionFee' },
      },
    },
  ]);

  res.send(result[0].totalTuitionFee);
  // res.render("analytics");
});
////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log("server is running at port no. " + port);
});
