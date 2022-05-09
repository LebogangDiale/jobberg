const pool = require('../../database');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');

const queries = require('../queries/queries');
require('../controllers/candidates');


const addRecruiter = async (req,res) => {
    var randomPassword = Math.random().toString(36).slice(-8);
    console.log(randomPassword);
    const {first_name, last_name, email,phone_number} = req.body;
    
    

    console.log(first_name+' '+ last_name+' '+  email+' '+ randomPassword)
    if( toString(randomPassword).length<8){
        res.status(400).json('Your Password should be longer than 7 characters');
    }else{
        // console.log(randomstring);
        const salt=await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(randomPassword, salt);

        // check if email exists
        pool.query(queries.checkUserEmailExists, [email], (error, results) => {
            console.log('email');
            console.log(results.rows.length)
            if (results.rows.length){
            
                res.status(409).json({error:"Email Already exists"});
                
            }else{
                pool.query(queries.addRecruiter, 
                    [first_name,last_name,email, passwordHash, phone_number],
                    (error,results)=>{
                    if(error){ 
                        res.status(500).json({error: 'invalid input'})
                        throw error;
                    }else{
                        addRecruiterMailer(email,first_name, randomPassword);
                        res.status(201).json("User created successfully");
                    }
                });
            }
        });
    
    }
}


const getRecruiters = async (req, res) => {
    
    pool.query(queries.getRecruiters, (error, results) => {
        if(this.error){
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    });
};



const getRecruiterById = async (req, res) => {
    
    id = parseInt(req.params.id)
    pool.query(queries.getRecruiterById,[id], (error, results) => {
        if(this.error){
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    });
};




const searchCandidates = async(req, res)=>{
    pool.query(queries.search,(error,results)=>{
        if(this.error){
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows);
        console.log(results.rows)
    })
}

const addToShortlist = async (req,res)=>{
    const {fk_guest_id, fk_candidate_id} = req.body
    pool.query(queries.verifyShortlistedCandiExist, 
        [fk_guest_id, fk_candidate_id], (error, results) => {
        
        console.log(results.rows.length)
        if (results.rows.length){
        
            res.status(409).json({error:"Candidate Already shortlisted"});
            
        }else{
            pool.query(queries.addToShortList, 
                [fk_guest_id, fk_candidate_id],
                (error,results)=>{
                if(error){ 
                    res.status(500).json({error: 'invalid input'})
                    throw error;
                }else{
                    res.status(201).json("Candidate successfully shortlisted");
                }
            });
        }
    });
}

const getRecruiterShortlist = async (req,res)=>{
    const {id} = req.params;
    pool.query(queries.getRecruiterShortlist, 
        [id],
        (error,results)=>{
        if(error){ 
            res.status(500).json({error: 'invalid'})
            throw error;
        }else{
            res.status(201).json(results.rows);
        }
    });
}

const getshortListedCandidates = async (req, res) => {
    id=parseInt(req.params.id);
    
    pool.query(queries.getshortListedCandidates,[id], (error, results) => {
        if(this.error){
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
        console.log(results.rows)
    });
};

const deleteShortlistedCandidate = async (req,res)=>{
    id=parseInt(req.params.id);
    // const fk_candidate_id = parseInt(req.body.fk_candidate_id);
    console.log("hdewbhbewh",req.query.fk_candidate_id);
    const fk_candidate_id = parseInt(req.query.fk_candidate_id);

    console.log("the id: "+id);
    console.log("the candidate id: "+fk_candidate_id);
    pool.query(queries.removeShortlistCandidate, 
        [id, fk_candidate_id],
        (error,results)=>{
        if(error){ 
            res.status(500).json({error: 'invalid input'})
            throw error;
        }else{
            res.status(202).json("Candidate successfully removed");
        }
    });
    
}




const addRecruiterMailer = async (email,name, password)=>{
    let mailOptions = {
        from: 'ntsakokhozacc@gmail.com', // sender address
        to: email, // list of receivers
        
        subject: 'Account successfully registered', // Subject line
        // text: text, // plain text body
        html:   
        `<h3>Greetings ${name},</h3><br>
        <h3>This email serves to inform you that your account is now active😊, <br>
        
        Below are your login credentials you, your password can be updated at your own discretion on our platform:</h3><br>
        <h2><ul><u>Login Details</u><h2/>
        Username: ${email}<br>
        password: ${password}<br>
        visit our site at <a href="http://localhost:4315/login">Visit jobberg.co.za!</a><br><br>
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
    // guestLogin,
    searchCandidates,
    addRecruiter,
    getRecruiters,
    addToShortlist,
    getRecruiterShortlist,
    deleteShortlistedCandidate,
    getshortListedCandidates,
    getRecruiterById,
};