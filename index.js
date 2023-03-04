const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const _= require("lodash")

app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"))


mongoose.connect("mongodb+srv://imsoumyaprakashbiswal:soumya-123@cluster0.9qnezv9.mongodb.net/todoList");

const itemSchema = {
    id: Number,
    name: String
}
const items = mongoose.model("item", itemSchema);
const item1 = new items({
    id: 1,
    name: "this is a basic todoList app"
});
const item2 = new items({
    name: "click on plus sign to add elements"
});
const item3 = new items({
    name: "click on - sign to delete an item"
})
var defaultItems = [item1, item2, item3];
const listSchema = {
    name: String,
    items: [itemSchema]
}
const list = mongoose.model("List", listSchema);



app.get("/", function (req, res) {


    items.find({}).then((listitems) => {
        if (listitems.length === 0) {
            items.insertMany(defaultItems);
            res.redirect("/")

        } else
            res.render("list", { listTitle: "Today", newListItem: listitems });
    }
    )
});
app.post("/", function (req, res) {
    var item = req.body.todo;
    var listTitle = req.body.list;
    var newitem = new items({
        name: item
    })
    if (listTitle === "Today") {
        newitem.save();
        res.redirect("/")
    }
    else {
        list.findOne({name:listTitle}).then((foundlist)=>{
            foundlist.items.push(newitem);
            foundlist.save()
            res.redirect("/"+listTitle)
        })
    }

})

app.get("/:customListName",  async (req, res)=> {
    const customlistTitle = _.capitalize(req.params.customListName);
    try{
         const user= await list.findOne({ name: customlistTitle });
         if(!user){
            const lists =new list({
                name:customlistTitle,
                items:defaultItems
            })
            lists.save()
            res.redirect("/"+customlistTitle);
         }
         else{
            res.render("list",{ listTitle:user.name, newListItem:user.items })
         }


    }catch(err){
        console.log("error found")
    }

});

app.get("/about", function (req, res) {
    res.render("about");
})
app.get("/delete", function (req, res) {

})
app.post("/delete", function (req, res) {
    const deleteElmentId = req.body.checkbox;
    const deleteElementList= req.body.hide;
    if(deleteElementList==="Today"){
        items.findByIdAndRemove(deleteElmentId).then((err) => {
            if (!err) {
                console.log("no error");
            }
        })
        res.redirect("/");
    }
    else{
        list.findOneAndUpdate({name:deleteElementList},{$pull:{items:{_id:deleteElmentId}}}).then((err,foundList)=>{
            if(!err){
            }

        })
        res.redirect("/"+deleteElementList)

    }
   
})
app.listen(process.env.PORT || 3000, function () {
    console.log("port 3000 is used");
});
