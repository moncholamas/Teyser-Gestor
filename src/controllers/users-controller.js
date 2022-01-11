const  BaseController  = require('./controller-base');


class UserController extends BaseController{
    constructor({UserService}){
        super(UserService);
    }

    getAllUsers = this.catchAsync(
        async (req, res, next) =>{
            const result = await this.service.getAll();
            res.json({status: 200, body: result});
        }
    ) 
    getUser = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const result = await this.service.getById(id);
            res.json({ body: result}) ;
        }
    )
    createUser = this.catchAsync(
        async (req, res, next) =>{
            const {body} = req;
            const result = await this.service.create(body);
            res.json({ body: result}) ;
        }
    ) 
    updateUser = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const {body} = req;
            const result = await this.service.update(id, body);
            res.json({ body: result}) ;
        }
    )

    deleteUser = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const result = await this.service.destroy(id);
            res.json({ body: result}) ;
        }
    )
}

module.exports = UserController;