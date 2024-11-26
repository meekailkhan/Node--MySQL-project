import Router from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import contro from '../controller/user-controll.js'

// check data base connectivity
// contro.main()


const router = Router()


// create custome for ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set pulic directory as a static files
const publicDir = path.join(__dirname,'../public')
router.use(Router.static(publicDir))


// set template engine hbs
router.set('view engine','hbs');


// end point for home page
router.get('/home',(req,res)=>{
    res.render('index');
})

// end point for register user
router.get('/register', (req, res) => {
    res.render('register'); 
});

router.get('/login',(req,res)=>{
    res.render('login')
})


router.post('/register', contro.registerUser)

router.post('/login',contro.loginUser)

// export router
export default router