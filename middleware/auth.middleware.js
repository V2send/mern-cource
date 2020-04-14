const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    console.log(`auth.middleware:\n\theaders:${req.headers.authorization}`)
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"
        console.log(`token:${token}`)
        if (!token) {
            return res.status(401).json({message: 'Немає авторизації'})
        }
        console.log("jwtSecret:", config.get('jwtSecret'))
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        console.log(`decoded:${decoded.userId}`)
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({message: 'Немає авторизації'})
    }
}
