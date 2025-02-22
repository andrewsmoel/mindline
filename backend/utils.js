require('dotenv').config()
const jwt = require('jsonwebtoken')
let crypto = require('crypto');
const { v4: uuidv4 } = require('uuid')
const path = require('path')

class Utils {

    hashPassword(password){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
        return [salt, hash].join('$');
    }

    verifyHash(password, original){
        const originalHash = original.split('$')[1];
        const salt = original.split('$')[0];
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
        return hash === originalHash;
    }

    generateAccessToken(user){
        //console.log('Secret = ', process.env.ACCESS_TOKEN_SECRET)
        //console.log('User = ', user)
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d'})
    }

    generateRefreshToken(user) {
        // Refresh token valid for 30 days (adjust as needed)
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
      }

      authenticateToken(req, res, next) {
        //console.log("All request headers:", req.headers); // Debug log
      
        const authHeader = req.headers['authorization'];
        //console.log("Authorization header received:", authHeader); // Debug log
      
        const token = authHeader && authHeader.split(' ')[1];
      
        if (!token) {
          return res.status(401).json({ error: 'Token not found' });
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
            //console.log("Token verification error:", err);
            return res.status(403).json({ error: "Invalid or expired token" });
          }
          req.user = user;
          next();
        });
      }

    uploadFile(file, uploadPath, callback){        
        // get file extension (.jpg, .png etc)
        const fileExt = file.name.split('.').pop()
        // create unique file name  
        const uniqueFilename = uuidv4() + '.' + fileExt
        // set upload path (where to store image on server)
        const uploadPathFull = path.join(uploadPath, uniqueFilename)
        // console.log(uploadPathFull)
        // move image to uploadPath
        file.mv(uploadPathFull, function(err) {
            if(err){
                //console.log(err)
                return false
            }
            if(typeof callback == 'function'){
                callback(uniqueFilename)
            }
        })
    }
}

module.exports = new Utils()