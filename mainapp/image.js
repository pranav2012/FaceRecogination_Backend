const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7c65fa7452474f8b8f83340c0d1a6e75'
});

const imgfilehandler = (req,res) =>{
    const {file} = req.body;
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,{base64:file})
        .then(data => {
            res.json({
                status:'sucess',
                data:data
            });
        })
        .catch(err => {
            console.log('error: ' + err);
            res.status(400).json('error file fetching api');
        });
}

const apihandler = (req, res) => {
    const { input } = req.body;
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,input)
        .then(data => {
            res.json({
                status:'sucess',
                data:data
            });
        })
        .catch(err => {
            console.log('error: ' + err);
            res.status(400).json('error url fetching api');
        });
}

const imgcounthandler = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('enteries', 1)
        .returning('enteries')
        .then(enteries => res.json(enteries))
        .catch(err => res.status(400).json('unable to get any enteries'))
}

module.exports = {
    apihandler,
    imgcounthandler,
    imgfilehandler
}