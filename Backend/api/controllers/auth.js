const pool = require('../../database');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');

const queries = require('../queries/queries');

require('dotenv').config();

const userIdSubmmittedy=''
const login =async (req,res) =>{
    const {email} = req.body;
    const {password} = req.body;
   
    
    
    pool.query(queries.checkUserEmailExists, [email], (error, results) => {
        if (!results.rows.length){
            res.status(404).json({error:"Invalid email or password"});
        }else{
            console.log(password);
            pool.query(queries.getCandidatePasswordByEmail,[email],(error,results)=>{
                console.log(results.rows[0]);
                const userIdSubmmitted=results.rows[0].id;
                const queryPassword= bcrypt.compareSync(password, results.rows[0].password);
                if(!queryPassword){
                    res.status(404).json({error:"Invalid email or password"});
                }else{
                    pool.query(queries.getUserRoleAndId,[userIdSubmmitted],(error,results)=>{
                        console.log('it worked');
                        console.log(results.rows[0]);
                        res.status(200).json(results.rows[0])
                    })
                }

            })
        }
    })
}


const sendFeedback = async(req, res) => {
    const {email,message,name} = req.body;

    console.log(email+' '+message+' '+name);
    sendfeedMailer(email,name,message);
    res.status(201).json('Message sent');
   
};




const sendfeedMailer = async (email,name, message)=>{
    console.log('log');
    let mailOptions = {
        from: 'ntsakokhozacc@gmail.com', 
        to: 'ntsakokhozacc@gmail.com',
        subject: `Message from ${name} ${email}`,
        html:message,
    };
    Transporter.sendMail(mailOptions,function(err,data){
      if(err){
          console.log(err);
      }
    });
   
}

const updatePassword = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const {newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);



    pool.query(queries.checkUserEmailExists, [email], (error, results) => {
        if (!results.rows.length) {
            res.status(404).json({ error: "invalid user credentials" });
        } else {
            console.log(password);
            console.log(email);
            
            pool.query(queries.getCandidatePasswordByEmail, [email], (error, results) => {
                console.log(results.rows[0]);
                const userIdSubmmitted = results.rows[0].id;
                const queryPassword = bcrypt.compareSync(password, results.rows[0].password);
                console.log(queryPassword)
                if (queryPassword==false) {
                    res.status(404).json({ error: "The password supplied does not match the existing password" });
                } else {
                    // add updated password
                    pool.query(queries.updatePassword, [passwordHash, email], (error, results) => {
                        if(error){
                            res.status(500).json({ error:'invalid password' });
                        }else{
                            res.status(200).json('Password successfully updated');
                        }
                        
                    })
                    console.log('it worked')

                    // add user
                }

            })
        }
    })
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
   
    login,
    sendFeedback,
    updatePassword,
    
};