const  {BaseController}  = require('./');


class UserController extends BaseController{
    constructor({UserService}){
        super();
        this.userService = UserService;
    }

    getAllUsers = this.catchAsync(
        async (req, res, next) =>{
            const result = await this.userService.getAll();
            res.json({ body: result}) ;
        }
    ) 
    getUser = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const result = await this.userService.getById(id);
            res.json({ body: result}) ;
        }
    )
    createUser = this.catchAsync(
        async (req, res, next) =>{
            const {body} = req;
            const result = await this.userService.create(body);
            res.json({ body: result}) ;
        }
    ) 
    updateUser = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const {body} = req;
            const result = await this.userService.update(id, body);
            res.json({ body: result}) ;
        }
    )

    deleteUser = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const result = await this.userService.destroy(id);
            res.json({ body: result}) ;
        }
    )
}

module.exports = UserController;