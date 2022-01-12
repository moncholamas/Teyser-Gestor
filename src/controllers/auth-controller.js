const  BaseController = require('./controller-base');
const status = require('../config/constants/status');
const message = require('../config/constants/message');


class AuthController extends BaseController{
    constructor({UserService}){
        super(UserService);
    }

    getAuth = this.catchAsync(
        async (req, res, next) =>{
            const {mail,pass} = req.body
            //verifiry pass and email
            const result = await this.service.getByMail(mail);
            res.status(status.OK).json({message: message.OK, body: result});
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