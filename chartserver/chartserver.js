const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
app.use(cors());
const config = require("./config.json")
app.use(express.json())
app.get("/totalapicount",function(req,res){
    let connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
      });

      connection.connect();
      let result = [];
      connection.query(`select * from (select DATE_FORMAT(time,'%m-%d') as date,count(*) as cnt from BotLog 
      group by DATE_FORMAT(time,'%M%D') order by time desc limit 7) as a order by date asc`
      ,async function(err,rows){
      //if(rows)console.log(decodeURI(rows[0].date));
      
      for(let i=0;i<rows.length;i++){
        let inData = {};
        inData.date = encodeURI(rows[i].date);
        inData.cnt = encodeURI(rows[i].cnt);
        result.push(inData)
      }
      res.send(result) 
    })
      

    }
    )


    app.get("/serverrank",function(req,res){
        let connection = mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
          });
    
          connection.connect();
          let result = [];
          connection.query(`SELECT count(*) as cnt,servername from BotLog group by servername order by cnt desc limit 5`
          ,async function(err,rows){
          for(let i=0;i<rows.length;i++){
            let inData = {};
            inData.servername = encodeURI(rows[i].servername);
            inData.cnt = encodeURI(rows[i].cnt);
            result.push(inData)
          }
          res.send(result) 
        })
          
    
        }
        )

    app.listen(3000,() => console.log("start server"));