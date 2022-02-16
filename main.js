const { app, BrowserWindow, Menu } = require('electron')
const log = require('electron-log')

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
    height: 600,
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
  Menu.setApplicationMenu(mainMenu)
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