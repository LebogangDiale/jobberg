const pool = require('../../database');
const bcrypt = require('bcryptjs')
require('../controllers/candidates');
const nodemailer = require('nodemailer');

const queries = require('../queries/queries');


const addAdmin = async (req,res) => {
    var randomPassword = Math.random().toString(36).slice(-8);
    const {first_name, last_name, email,} = req.body;

    console.log(first_name+' '+ last_name+' '+  email+' '+ randomPassword)
    if( toString(randomPassword).length<8){
        res.status(400).json('Your Password should be longer than 7 characters');
    }else{
        // console.log(randomstring);
        const salt=await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(randomPassword, salt);

        // check if email exists
        pool.query(queries.checkUserEmailExists, [email], (error, results) => {
            if (results.rows.length){
                res.status(409).json({error:"Email Already exists"});
            }else{
                pool.query(queries.addAdmin, 
                    [first_name,last_name,email, passwordHash],
                    (error,results)=>{
                    if(error){ 
                        res.status(500).json({error: 'invalid input'})
                        throw error;
                    }else{
                        addAdminMailer(email,first_name, randomPassword);
                        res.status(201).json("User created successfully");
                    }
                });
            }
        });
    
    }
}


const getActAdmins= async (req,res) =>{
    pool.query(queries.getAdmins,(error,results)=>{
        if(error){
            res.send(500).json({error:'something went wrong'});
        }else{
            console.log(results.rows)
            res.status(200).json(results.rows)
        }
    })
}


const getUsers= async (req,res) =>{
    pool.query(queries.getUsers, (error, result)=>{
        if(error){
            res.status(500).json({error: 'something went wrong'})
            throw error;
        }else{
            res.status(200).json(result.rows);
        }
    })
}

const getActiveUsers= async (req,res) =>{
    pool.query(queries.getActiveUsers, (error, result)=>{
        if(error){
            res.status(500).json({error: 'something went wrong'})
            throw error;
        }else{
            res.status(200).json(result.rows);
        }
    })
}

const getNonActiveUsers= async (req,res) =>{
    pool.query(queries.getNonActiveUsers, (error, result)=>{
        if(error){
            res.status(500).json({error: 'something went wrong'})
            throw error;
        }else{
            res.status(200).json(result.rows);
        }
    })
}

const removeUserById = async (req,res) =>{
    const id =parseInt(req.params.id);

    pool.query(queries.getUserById,[id],(error, results)=>{
        const noUserfound = !results.rows.length;
        if(noUserfound){
            res.status(404).json("User does not exist in the database.");
        }else{
            pool.query(queries.removeUserById,[id],(error, results)=>{
                if(error) throw error;
                res.status(200).json("User removed successfully");
        });
        }
    });

}

const activeUserById = async (req,res) =>{
    const id =parseInt(req.params.id);

    pool.query(queries.getUserById,[id],(error, results)=>{
        const noUserfound = !results.rows.length;
        if(noUserfound){
            res.status(404).json("User does not exist in the database.");
        }else{
            pool.query(queries.activeUserById,[id],(error, results)=>{
                if(error) throw error;
                res.status(200).json("User actived successfully");
        });
        }
    });

}

const getUserById = async (req,res) => {
    const id=parseInt(req.params.id);
    
    pool.query(queries.getUserById,[id],(error,results)=>{
        if(!results) return res.status(400).send("invalid input");
        if(!results.rows.length){ 
            res.status(404).send('profile not found')
            //throw error
        }else{
            res.status(200).json(results.rows[0]);
        }
        
    })

}



const addAdminMailer = async (email,name, password)=>{
    let mailOptions = {
        from: 'ntsakokhozacc@gmail.com',
        to: email,
        subject: 'Admin Account successfully registered', // Subject line
        // text: text, // plain text body
        html:   
        `<h3>Greetings ${name},</h3><br>
        <h3>This email serves to inform you that your admin account is now active😊, <br>
        
        Below are your login credentials you, your password can be updated at your own discretion on the platform:</h3><br>
        <h3><ul><u>Login Details</u><h3/>
        Username: ${email}<br>
        password: ${password}<br>
        visit the site at <a href="http://localhost:4315/login">Visit jobberg.co.za!</a><br><br>
        </ul><h3>
        kind Regards,<br>
         Jobberg Team
         </h3>`
        // html body
    };
    Transporter.sendMail(mailOptions,function(err,data){
      if(err){
          console.log(err);
      }
    });
   
}

const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "ntsakokhozacc@gmail.com",
        pass:"pdthgosbwikeapvz"
    },
    tls:{
        rejectUnauthorized:false
      }
});

module.exports = {
    // adminLogin
    addAdmin,
    getUsers,
    getActiveUsers,
    getNonActiveUsers,
    getActAdmins,
    removeUserById,
    activeUserById,
    getUserById,
};