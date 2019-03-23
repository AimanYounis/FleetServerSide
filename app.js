const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//create connection
var db = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'FatKxtM5kq',
    password : '4ro5Rr2hkd',
    database : 'FatKxtM5kq'
  });
  
//connect to database

db.connect((err)=>{
    if(err){
        console.log("Didn't connect");
        throw err;
    }else{
        console.log('mysql is connected')
    }
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


  

    app.get('/',(req,res)=>{
        res.send('Hello World !');
    });
   
    app.get('/getCompany/:id' ,(req,res) => {
        let sql = `SELECT * FROM vehiclecompanies WHERE VehicleCompanyID = ${req.params.id}`;
        let query = db.query(sql,(err,result)=>{
              if(err) throw err;
              console.log(result);
              res.send(result);
        });
    });

    /**let uri = `http://localhost:3000/updateCompany/${this.VehicleCompanyID}`;
          this.axios.post(uri, this.CompanyName).then(() => {
            this.$router.push({name: 'posts'}); */
    //Update post
    app.post('/updateCompany/:id' ,(req,res) => {
        let trying = {CompanyName : req.body.CompanyName};
        let sql = 'UPDATE vehiclecompanies SET ? WHERE VehicleCompanyID='+req.params.id;
        let query = db.query(sql,trying,(err,result)=>{
              if(err) {
                  res.send('Error');
                  console.log(err);
              }
              console.log('Success');
              res.send('Success');
        });
    });


    //get vehicle companies
    app.get('/getCompanies' ,(req,res) => {
        let sql = 'SELECT * FROM vehiclecompanies';
        let query = db.query(sql,(err,results)=>{
              if(err) {
                  res.send('Error');
                  console.log(err);
                }
              console.log('Success');
              res.json(results);
        });
    });

    //Add VehicleCompany
    app.post('/addCompany' ,(req,res) => {
        let company = {VehicleCompanyID : req.body.VehicleCompanyID, CompanyName : req.body.CompanyName};
        let sql = 'INSERT INTO vehiclecompanies SET ?';
        let query = db.query(sql,company,(err,result)=>{
              if(err){
                res.send('Error in adding company!');
                console.log(err);
              }
              console.log('Success');
              res.send('Success');
        });
    });

    
    //Add VehicleType
    app.post('/addVehicleType', (req,res)=>{
        let VehicleType ={
            VehicleTypeID : req.body.VehicleTypeID,
            CarCompanyID : req.body.CarCompanyID,
            Model : req.body.Model,
            IsElectronic : req.body.IsElectronic
        };
        let sql = 'INSERT INTO vehicletypes SET ?';
        let query = db.query(sql,VehicleType,(err,result)=>{
            if(err) res.send('Error');
            console.log(result);
            res.send('Success');
        })
    });

    //Update VehicleType
    app.post('/updateVehicleType/:id' ,(req,res) => {
        let updated = {
            CarCompanyID : req.body.CarCompanyID,
            Model : req.body.Model,
            IsElectronic : req.body.IsElectronic
        };
     
        let sql = 'UPDATE vehicletypes SET ? WHERE VehicleTypeID='+req.params.id;
        let query = db.query(sql,updated,(err,result)=>{
              if(err) res.send('Error');
              console.log(result);
              res.send('Success');
        });
    });

    //get vehicle types
    app.get('/getVehicleTypes' ,(req,res) => {
        let sql = 'SELECT * FROM vehicletypes';
        let query = db.query(sql,(err,results)=>{
              if(err) throw err;
              console.log(results);
              res.send(results);
        });
    });

    //get Vehicles
    app.get('/getVehicles' ,(req,res) => {
        let sql = 'SELECT * FROM vehicles';
        let query = db.query(sql,(err,results)=>{
              if(err) throw err;
              console.log(results);
              res.json(results);
        });
    });

    //update vehicles
    app.post('/updateVehicle/:id' ,(req,res) => {
        let updatedVehicle = {
            VehicleTypeID : req.body.VehicleTypeID,
            LicensePlate : req.body.LicensePlate,
            ActivationMonth : req.body.ActivationMonth,
            PurchaseMonth : req.body.PurchaseMonth,
            BatteryExpiryDate : req.body.BatteryExpiryDate,
            Remarks : req.body.Remarks
        
        };
        let sql = 'UPDATE vehicles SET ? WHERE VehicleID='+req.params.id;
        let query = db.query(sql,updatedVehicle,(err,result)=>{
              if(err){
                  res.send('Error');
                }
              console.log(result);
              res.send('Success');
        });
    });
 
    //Add Vehicle
    app.post('/addVehicle', (req,res)=>{
      let VehicleAdd ={
            VehicleID : req.body.VehicleID,
            VehicleTypeID : req.body.VehicleTypeID,
            LicensePlate : req.body.LicensePlate,
            ActivationMonth : req.body.ActivationMonth,
            PurchaseMonth : req.body.PurchaseMonth,
            BatteryExpiryDate : req.body.BatteryExpiryDate,
            Remarks : req.body.Remarks
        };
    
        let sql = 'INSERT INTO vehicles SET ?';
        let query = db.query(sql,VehicleAdd,(err,result)=>{
            if(err) {
                res.send('Error');
                console.log(err);
                return;
            }else{
                console.log(result);
            res.send('Success');
            }
           
        })
    });


let PORT = process.env.PORT || 3300;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})


