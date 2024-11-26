import db from '../database/db.js';
import queries from './query.js';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';


async function registerUser(req, res) {
    try {
        const { name, email, password, passwordConfirm } = req.body;

        // Validate fields

        // Check if email already exists
        const [result] = await db.query(queries.checkUser, [email]);
        if (!name || !email || !password || !passwordConfirm) {
            console.log('Validation Error: All fields are required.');
            return res.render('register', { message: 'All fields are required.' });
        }

        if (password !== passwordConfirm) {
            console.log('Validation Error: Passwords do not match.');
            return res.render('register', { message: 'Passwords do not match.' });
        }

        if (result.length > 0) {
            console.log('Validation Error: Email is already registered.');
            return res.render('register', { message: 'Email is already registered.' });
        }

        let hashPassword = await bcrypt.hash(password,8);
        console.log(hashPassword)

        // Insert new user
        await db.query(queries.insertUser, [name,email,hashPassword,]);

        return res.render('user-profile',{
            userEmail : req.body.email,
            userName : req.body.name
        })
    } catch (error) {
        console.error('Unexpected Error:', error.message);
        res.render('register', { error: 'An unexpected error occurred. Please try again.' });
    }
}


async function loginUser(req,res){
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // Validate fields

        // Check if email already exists
        const [result] = await db.query(queries.checkUser, [email]);
        

        if (result.length === 0) {
            console.log('User Not Found');
            return res.render('login', { message: 'Email Is Not Found.' });
        }

        let isMatch = await bcrypt.compare(password,result[0].password);
        
        if(!isMatch){
            console.log('Password is invalid');
            return res.render('login', { message: 'Password incorrect'})
        }

        // Insert new user

        return res.render('user-profile',{
            userEmail : result[0].email,
            userName : result[0].name
        })
    } catch (error) {
        console.error('Unexpected Error:', error.message);
        res.render('login', { error: 'An unexpected error occurred. Please try again.' });
    } 
}


export default {
    registerUser,
    loginUser
};


















// (async () => {
//     let connection;
//     try {
//         // Step 1: Connect to the database
//         connection = await connectToDatabase();

//         // Step 2: Execute a query
//         const [rows] = await connection.execute('SELECT * FROM users'); // Change `users` to your table
//         console.log('Data retrieved:', rows);
//     } catch (err) {
//         console.error('Error:', err.message);
//     } finally {
//         // Step 3: Close the connection if it exists
//         if (connection) {
//             await connection.end();
//             console.log('Connection closed.');
//         }
//     }
// })();