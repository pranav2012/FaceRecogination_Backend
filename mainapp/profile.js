const profilehandler = (req, res, db) => {
    const { id } = req.params;
    db.select('id', 'name', 'username', 'enteries').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            }
            else {
                res.status(400).json('no such user!')
            }
        })
        .catch(err => res.status(400).json('error finding user'))
}

module.exports = {
    profilehandler
}