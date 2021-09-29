import db from '../../../lib/db'

export default async function handler(req,res) {
    var id = req.query.id
    await db.deleteUser({id})    
    res.status(200).json({data:'OK'})
}

