const express = require("express");
const path = require("path");
const port = 9000;

const db = require("./config/mongoose");
const Todolist = require("./models/todo");

const app = express();

//Template engine
app.set("view engine", "ejs");
//path of the views directory
app.set("views", path.join(__dirname, "views"));

//built-in middleware for serving static files
app.use(express.static("assets"));

//Parser
app.use(express.urlencoded());

app.get("/", function (req, res) {
  Todolist.find({}, function (err, tasks) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }

    return res.render("home", {
      title: "todo app",
      todo_task: tasks,
    });
  });
});

//for creating a new task
app.post("/addtask", function (req, res) {
  Todolist.create(
    {
      nameoftask: req.body.nameoftask,
      desoftask: req.body.desoftask,
      catoftask: req.body.catoftask,
      duedate: req.body.duedate,
    },
    function (err, newTask) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }

      console.log("****", newTask);
      return res.redirect("back");
    }
  );
});

//for deleting a contact
app.get("/delete-task", function (req, res) {
  //get the id from query in the url
  let id = req.query.id;

  //find the contact in the database using id and delete it.
  Todolist.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting an object from database");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }

  console.log("Express server is running on port:", port);
});
