import bcrypt from 'bcrypt'

export async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error){
        console.log(error)
        return false
    }
}

export async function comparePasswords(password, hashedPassword){
    try{
        return await bcrypt.compare(password, hashedPassword)
    } catch(error){
        console.log(error)
        return false
    }
}