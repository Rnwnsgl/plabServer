const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 3000;
const bodyparser = require('body-parser');
const router = require("./routes")

app.use(express.json());
app.use(express.static("uploads"));
app.use(bodyparser.urlencoded({extended:false}));
app.use("/", router);
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, ()=>{
    console.log(`서버(Port:${port}) 실행 중..`)
})