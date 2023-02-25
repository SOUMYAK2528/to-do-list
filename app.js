const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const date= require(__dirname+"/date.js");
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
var items = [];
var workitems = [];
app.use(express.static("public"));
var listTitle = "";

app.get("/", function (req, res) {
    const day= date.getdate();
    res.render("list", { listTitle: day, newListItem: items });
});
app.post("/", function (req, res) {
    var item = req.body.todo;
    listTitle = req.body.list;
    if (listTitle === "work") {
        workitems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "work", newListItem: workitems });
});
app.post("/work", function () {
})
app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000, function () {
    console.log("port 3000 is used");
});