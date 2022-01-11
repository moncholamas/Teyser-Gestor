const  BaseController = require('./controller-base');


class AuthController extends BaseController{
    constructor({UserService}){
        super(UserService);
    }

    getAuth = this.catchAsync(
        async (req, res, next) =>{
            const {mail,pass} = req.body
            //verifiry pass and email
            const result = await this.service.getByMail(mail);
            res.json({status: 200, body: result});
        }
    ) 
    setAuth = this.catchAsync(
        async (req, res, next) =>{
            // create a new user
            // const result = await this.service.getById(id);
            res.json({ body: req.body.pass}) ;
        }
    )
}

module.exports = AuthController;