const express=require('express');
const {PORT}=require('./config/serverConfig');
const bodyParser= require('body-parser');
const apiRoutes=require('./routes/index');
const db=require('./models/index')
const app=express();

const prepareAndStartServer=()=>{
   //app.use(express.json());
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}));
   app.use('/api',apiRoutes);
   app.listen(PORT,()=>{
    console.log(`Server Started on PORT: ${PORT}`);
    if(process.env.DB_SYNC==true)
    {
      db.sequelize.sync({alter:true});
    }
   });
}

prepareAndStartServer();