const express = require('express')
const { connectDB } = require('./config/database');
const { authRouter } = require('./routes/auth');
const cookieParser=require('cookie-parser');
const { userRouter } = require('./routes/user');
const { profileRouter } = require('./routes/profile');
const { notificationRouter } = require('./routes/notification');
const cors=require('cors');
const dotenv=require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));

app.get("/",(request,response)=>{
  ///server to client
  response.json({
      message : "Server is running " + port
  })
})

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',userRouter);
app.use('/',notificationRouter);

const port=process.env.PORT || 2788;

connectDB()
  .then(() => {
    console.log('connected to database successfully')
    app.listen(port, () => {
      console.log('successfully listening on port 2788')
    })
  })
  .catch(() => {
    console.error('Error in connecting to database');
  });
