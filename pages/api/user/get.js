import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  const data = req.session.get("user");
  
  if (data) {
    res.json(data);
  }
  else 
    res.json({loggedIn:false});
  
});
