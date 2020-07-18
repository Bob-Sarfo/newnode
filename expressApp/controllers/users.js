module.exports.controller = (app)=>{
  //get users page
  app.get('/users',(req,res)=>{
    res.render('users',{title: 'Users',description:'this is the description given to Users'});
  });
};
