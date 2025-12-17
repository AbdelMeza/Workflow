import jwt from "jsonwebtoken"

export function createToken(infos){
    try{
        return jwt.sign(infos, "privateKey1.0")
    } catch(error){
        console.log(error)
        return false
    }
}

export function readToken(token){
    try{
        return jwt.verify(token, "privateKey1.0")
    } catch(error){
        console.log(error)
        return false
    }
}