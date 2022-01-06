const  {BaseController}  = require('./')

class UserController extends BaseController{
    constructor({UserService}){
        super(UserService);
        this.userService = UserService;
    }

    getAllUsers = async (req, res) =>{
        const result = await this.userService.getAll();
        res.json({ body: result}) ;
    }
}

module.exports = UserController;