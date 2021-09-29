import db from '../../../lib/db'

export default async function handler(req, res) {
    let resp = await db.restaurantBlockUser(req.query.restaurantId,{ userId: req.query.userId })
    res.status(200).json({data:resp})
}

