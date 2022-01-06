const  {BaseController}  = require('./')

class UserController extends BaseController{
    constructor({UserService}){
        super(UserService);
        this.userService = UserService;
        
    }

    async getAllUsers(req, res){
        console.log(this.userService);
        const result = await this.userService.getAll();
        res.json({msg: result, body: 'desde controller'}) ;
    }
}

module.exports = UserController;