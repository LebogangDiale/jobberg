const pool = require('../../database');
const queries = require('../queries/queries');

const newMessage = async (req,res) => {
    const {fk_candidate_id,fk_guest_id,message,sender} = req.body;
    pool.query(queries.createNewMsg, 
        [fk_candidate_id,fk_guest_id,message,sender],
        (error,results)=>{
        if(error){ 
            res.status(500).json({error: 'no conversation chats'})
            throw error;
        }else{
            res.status(200).json("New message sent!");
        }
    });

}

const getMessages= async (req,res) => {
    const {fk_candidate_id,fk_guest_id}=req.body
    pool.query(queries.getMessages,[fk_candidate_id,fk_guest_id],(error, results) => {
        if(error){ 
            throw error
        }else{
            console.log(results.rows);
            res.status(200).json(results.rows)
        }
    });

}




module.exports = {
    newMessage,
    getMessages,
    
};