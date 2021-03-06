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
        multipleStatements:true
      });

      connection.connect();
      let result = [];
      connection.query(`select * from (select DATE_FORMAT(time,'%m-%d') as date,count(*) as cnt from BotLog 
      group by DATE_FORMAT(time,'%M%D') order by time desc limit 7) as a order by date asc`
      ,async function(err,rows){
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
//##################################################################
// 스코어 체크부분
    app.post("/score",function(req,res){
      console.log(req.body)
      let connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
      });

      connection.connect();
      connection.query(`truncate custom`)
      console.log(req.body.length)
      for(let i = 0; i< req.body.length;i++){
        connection.query(`insert into custom (name,score) values ("${req.body[i]}",0)`)
      }
    })


    app.post("/minus",function(req,res){
      let connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
      });
      
      connection.connect();
        connection.query(`update custom set score = "${req.body[1]}" where idx = "${req.body[0]+1}" `)
      res.send();
    })



    app.post("/plus",function(req,res){
      let connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
      });
      
      connection.connect();
        connection.query(`update custom set score = "${req.body[1]}" where idx = "${req.body[0]+1}" `)
      res.send();
    })


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


        app.get("/botlog",function(req,res){
          let connection = mysql.createConnection({
              host: config.host,
              port: config.port,
              user: config.user,
              password: config.password,
              database: config.database,
            });
      
            connection.connect();
            let result = [];
            connection.query(`SELECT * from (select idx,date_format(time,'%y-%m-%d %h:%i:%s') as time,servername,channelname,usernick,usecommand,status FROM BotLog order by time desc limit 10) as a order by idx asc`
            ,async function(err,rows){
            for(let i=0;i<rows.length;i++){
              let inData = {};
              inData.time = encodeURI(rows[i].time).slice(3);
              inData.servername = encodeURI(rows[i].servername);
              inData.channelname = encodeURI(rows[i].channelname);
              inData.usernick = encodeURI(rows[i].usernick);
              inData.usecommand = encodeURI(rows[i].usecommand);
              inData.status = encodeURI(rows[i].status);
              result.push(inData)
            }
            res.send(result) 
          })
            
      
          }
          )



          app.get("/botinfo",async function(req,res){
            let connection = mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
                multipleStatements:true //다중쿼리 사용여부
              });
        
              connection.connect();
              let result = {};
             await connection.query("SELECT count(*) as hackcount FROM BotHack;"+ "SELECT count(*) as channelcount FROM BotChannel;"+ 
              "SELECT count(*) as cnt,servername from BotChannel group by servername;"+ "SELECT * FROM BotSaveNick;"+"SELECT count(*) as count from BotLog"
              ,await function(err,rows){
                result.hackcount = rows[0][0].hackcount;
                result.channelcount = rows[1][0].channelcount;
                result.servercount = rows[2].length;
                result.nickcount = rows[3].length;
                result.logcount = rows[4][0].count;
              res.send(result); 
            })
              
        
            }
            )



    app.listen(3000,() => console.log("start server"));