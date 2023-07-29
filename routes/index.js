var express = require('express');
var router = express.Router();


const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
var chuyenID = require('mongodb').ObjectId;

//trang chu
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang chủ' });
});

//them
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu' });
});

router.post('/them', function(req, res, next) {
  var dataCollection = {
    ten : req.body.ten,
    dienthoai : req.body.dt
  }
  const dbName = 'demomongodb';
  const adddata = async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('mongodbvip');
    await collection.insertOne(dataCollection);
    
  }
  adddata();
  res.redirect('/them');
});

//xem
router.get('/xem', function(req, res, next) {
  const dbName = 'demomongodb';
  const viewdata = async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('mongodbvip');
    const data = await collection.find().toArray();
    res.render('xem',{title:"Xem dữ liệu",data:data});
  }
  viewdata();
});

//xoa
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var idcanxoa = new chuyenID(req.params.idcanxoa);
  const dbName = 'demomongodb';
  const deletedata = async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('mongodbvip');
    await collection.deleteOne({_id:idcanxoa});
  }
  deletedata();
  res.redirect('/xem')
});


router.get('/sua/:idcansua', function(req, res, next) {
  var idcansua = new chuyenID(req.params.idcansua);
  const dbName = 'demomongodb';
  const updatedata = async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('mongodbvip');
    const data = await collection.find({_id:idcansua}).toArray();
    res.render('sua',{title:'Sửa dữ liệu', data:data})
  }
  updatedata();
  
});
router.post('/sua/:idcansua', function(req, res, next) {
  var idcansua = new chuyenID(req.params.idcansua);
  var dataCollection = {
    ten : req.body.ten,
    dienthoai : req.body.dt
  } 
  const dbName = 'demomongodb';
  const updatedata = async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('mongodbvip');
    await collection.updateOne({_id:idcansua},{$set:dataCollection});
    res.redirect('/xem');
  }
  updatedata();
  
});




module.exports = router;
