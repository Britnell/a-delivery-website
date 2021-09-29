import db from '../../../lib/db'

export default async function handler(req, res) {
    let data = await db.findOrder({
        userId: parseInt(req.query.id),
    })
    res.status(200).json({ data }) 
}

