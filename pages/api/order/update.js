import db from '../../../lib/db'

function getDateTime(){
    return new Date().toLocaleString()
}

export default async function handler(req, res) {
    
    if(!req.query.status || !req.query.id)
        return res.status(200).json({ error: 'Require id & status' }) 
    
    let id = parseInt(req.query.id)
    let status = req.query.status

    let order = await db.findOrder({ id })
    order = order[0]
    
    let hist = JSON.parse(order.history)
    hist[status] = getDateTime()

    let resp = await db.updateOrder(id,{
        ...order,   
        status,
        history: JSON.stringify(hist),
    })
    
    res.status(200).json({data: resp }) 
}

