// import prisma, {createRestaurant} from "../../../lib/prisma"

import db from '../../../lib/db'

export default async function handler(req, res) {
    let data = req.body.data
    data.blockedUsers = ''
    let created = await db.createRestaurant(data)
    res.status(200).json({ data: created })
}
