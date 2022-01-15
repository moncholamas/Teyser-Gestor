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
            //
            const result = await this.service.createUser(mail,pass)
            res.status(status.OK).json({message: message.OK, body: result});
        }
    ) 
    
    setAuth = this.catchAsync(
        async (req, res, next) =>{
            const {body} = req
            //createUsers verify mail 
            const result = await this.service.createAccount(body)
            res.json({ body: result}) ;
        }
    )
}

module.exports = AuthController;