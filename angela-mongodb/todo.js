const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoListDB");
mongoose.set("strictQuery", false);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// let items = ["a", "b"];

const itemSchema = {
  name: String,
};
const listSchema = {
  name: String,
  items: [itemSchema],
};

const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to todoList",
});
const item2 = new Item({
  name: "Hit the + button to add a new item",
});
const item3 = new Item({
  name: "<-- Hit this to minus item",
});

const defaultItems = [item1, item2, item3];

app.post("/", function (req, res) {
  let itemName = req.body.newItem;
  let listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    // add new item to list
    item.save();
    //  after added, redirect to page
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.get("/", (req, res) => {
  //   const today = new Date();
  //   const currentDay = today.getDay();

  //   if (today.getDay() === 6 || today.getDay() === 0) {
  //     day = "Weekend";
  //     // res.send("-- Weekends --");
  //   } else {
  //     day = "Weekday";
  //     // res.send("-- Work --");
  //   }
  //   //   res.send(day);

  //   switch (currentDay) {
  //     case 0:
  //       day = "Sunday";
  //       break;
  //     case 1:
  //       day = "Monday";
  //       break;
  //     case 2:
  //       day = "Tuesday";
  //       break;
  //     case 3:
  //       day = "Wednesday";
  //       break;
  //     case 4:
  //       day = "Thursday";
  //       break;
  //     case 5:
  //       day = "Friday";
  //       break;
  //     case 6:
  //       day = "Saturday";
  //       break;
  //     default:
  //       console.log("Error: Invalid date");
  //   }

  //   let options = {
  //     weekday: "long",
  //     day: "numeric",
  //     month: "long",
  //   };

  //   let day = today.toLocaleDateString("eu-US", options);

  //   res.render("list", { kindOfDay: day, newListItems: items });

  Item.find((err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log("Items - ", foundItems);
    }
    if (foundItems.length === 0) {
      // Insert data
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted to DB");
        }
      });
      res.redirect("/");
    } else {
      // read data
      res.render("list", { kindOfDay: "Today", newListItems: foundItems });
    }
  });
});

// 能够直接在 localhost:3000后加 /{name} 输入添加任何新的页面，
app.get("/:customListName", (req, res) => {
  console.log("CustomList - customListName -", req.params.customListName);
  const customListName = req.params.customListName;

  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      console.log("No Error");
      // 并且输入同样的名字多次，不会重复添加
      if (!foundList) {
        // create new list
        console.log("create new list");
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //   // show an existing list
        console.log("Existed! foundList.name -", foundList.name);
        res.render("list", {
          kindOfDay: foundList.name,
          newListItems: foundList.items,
        });
      }
    } else {
      console.log("-here-", err);
    }
  });
});

app.post("/delete", (req, res) => {
  //   console.log("=== Delete ===", req.body.checkbox);
  const targetId = req.body.checkbox;
  let listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(targetId, function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  } else {
    console.log("_id ---", _id);
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: targetId } } },
      (err, foundList) => {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000 ...");
});
