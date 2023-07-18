let auth = (req, res, next) => {
    let usertoken = req.cookies.jwt;
    if(!usertoken)
    {
        return res.status(400).send("user can not login")
    }
    next();
}

module.exports = auth;