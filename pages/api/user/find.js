import db from '../../../lib/db'

export default async function handler(req, res) {
    let data = await db.findUser(req.query)
    res.status(200).json({data}) 
}

