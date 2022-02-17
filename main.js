const { app,ipcMain, BrowserWindow, Menu } = require('electron')
const log = require('electron-log')
var CryptoJS = require("crypto-js");
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'


// Set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Password Manager',
    width: isDev ? 800 : 450,
    height: 620,
    icon: `${__dirname}/assets/icons/icon.png`,
    resizable: isDev ? true : false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadFile('./app/add.html')
}

app.on('ready', () => {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(null)
})

const menu=[]

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.allowRendererProcessReuse = true

ipcMain.on('getData',(e,options)=>{
  console.log("Hello")
  
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('Password-Manager')
const collection = db.collection('accounts')
collection.find().toArray((err, items) => {
  // console.log(items)
 
  var catList={}
  items.forEach(i=>{
    
    if(Object.keys(catList).includes(i.category)){
      catList[i.category].push(i.username)
    
    }else{
    
      catList[i.category]=[i.username]
    }

    
  })
 
 
  mainWindow.webContents.send("catData",catList)
  client.close()
})

  
})

 })

 ipcMain.on('getPass',(e,options)=>{
  
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('Password-Manager')
const collection = db.collection('accounts')
collection.find({username: options.username,category:options.category}).toArray((err, items) => {
  
  mainWindow.webContents.send("passData",crypt.decrypt(items[0].password))
  client.close()
})

  
})

 })

 var crypt = {
  
  secret : "CIPHERKEY",
 
  
  encrypt : function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },
 
  
  decrypt : function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};

ipcMain.on('createNew',(e,options)=>{
  console.log(options)
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('Password-Manager')
const collection = db.collection('accounts')
var obj={
  username:options.username,
  category:options.category,
  password: crypt.encrypt(options.password)
}
collection.insertOne(obj, (err, result) => {
  console.log(result)
  mainWindow.webContents.send("update")
  client.close()
})
// client.close()
  //...
})
       
 })


 ipcMain.on('editPass',(e,options)=>{
  console.log(options)
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('Password-Manager')
const collection = db.collection('accounts')
var obj={
  username:options.username,
  category:options.category,
  password: crypt.encrypt(options.password)
}
collection.updateOne({username: options.username,category:options.category}, {'$set': {'password': crypt.encrypt(options.password)}}, (err, item) => {
  console.log(item)
  client.close()
})

  //...
})
       
 })

 
 ipcMain.on('delete:send',(e,options)=>{
  console.log(options)
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('Password-Manager')
const collection = db.collection('accounts')
var obj={
  username:options.username,
  category:options.category,
  password: crypt.encrypt(options.password)
}
collection.deleteOne({username: options.username,category:options.category}, (err, item) => {
  console.log(item)
  client.close()
  mainWindow.webContents.send("delete:done")
})

  //...
})
       
 })