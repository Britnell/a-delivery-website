// import fetchJson from "../../../lib/fetchJson";

import withSession from "../../../lib/session";
import db from '../../../lib/db'

export default withSession(async (req, res) => {
  
  if(req.method!=='POST')
    return res.status(200).json({ error: ' this api is POST only' })
    
  const data = req.body.data ;
  
  var user = await db.findUser(data)
  
  user = user[0]
  if(!user)
    return res.json({error: ' No users found '})
  
  try {
    let login = {
      user: user, loggedIn: true
    }
    req.session.set("user",login)
    await req.session.save();
    res.json(login)
  }
  catch(err){
    res.json({ error: err.data });        
  }

});

