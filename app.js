import express from 'express';
import userRouter from './routes/routes.js'



const app = express();
const PORT = 9000;

app.use(express.urlencoded({extended : true}))
app.use(express.json());
// const publicDir = path.join(__dirname,'./public')
// app.use(express.static(publicDir))

// app.set('view engine','hbs');



app.use('/',userRouter);
app.use('/auth',userRouter)


app.listen(PORT,()=>{
    console.log(`listning port : http://localhost:${PORT}`)
})
    
