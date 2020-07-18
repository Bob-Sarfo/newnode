module.exports.controller = (app) =>{
    app.get('/company',(req,res)=>{
        res.render('company',{},err=>console.log(err));
    });
};