import db from '../../../lib/db'

export default async function handler(req, res) {
    // update name and description with id
    const data = req.body.data
    
    let edit = await db.editRestaurant(data.id,{
        name: data.name,
        description: data.description,
    })
    
    res.status(200).json({data: edit }) 
}

