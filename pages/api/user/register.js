import db from "../../../lib/db";


export default async function handler(req, res) {
    if(req.method!=='POST')
        return  res.status(200).json({ error: ' this api is POST only' })

    const data = req.body.data;

    let existing = await db.findUser({email: data.email})
    
    if(existing[0])
        return res.status(200).json({ error: 'email already in use ' })

    let user = await db.createUser(data)
    res.status(200).json(user)

}
