const bcrypt = require('bcrypt')

function hashing(pass,salt){
    let hash = bcrypt.hashSync(pass,salt)
    return hash
}

module.exports = hashing