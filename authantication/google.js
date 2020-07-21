const db = require("../database/database");
const { response } = require("express");

const googleauthchecker = (req,res,db,bcrypt) => {
    const {email} = req.body;
    db.select('id', 'email', 'enteries', 'name').from('users').where('email', '=', email)
    .then(user=>{
        res.json({
            status: 'sucess',
            username: user[0].name,
            enteries: user[0].enteries,
            id: user[0].id,
        });
    }).catch(err => res.status(400).json('error'));
}

module.exports = {
    googleauthchecker
}