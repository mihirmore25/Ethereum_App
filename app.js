require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/tronDB", 
{
	useNewUrlParser: true, 
	useUnifiedTopology: true
}
).then(() => console.log("Database is connected successfully..."))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/", require("./routes/routes"));
app.use("/", require("./routes/tron_routes"));




app.listen(3000, () => console.log("Server is running on port 3000..."));