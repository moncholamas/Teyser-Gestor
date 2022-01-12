
class BaseController {
    constructor(Service){
        this.service = Service;
    }

    catchAsync = (fn) => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
    
    getAll =  this.catchAsync(
            async (req, res, next) =>{
                const result = await this.service.getAll();
                res.json({status: 200, body: result});
            }
        )
        

    getById = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const result = await this.service.getById(id);
            res.json({ body: result}) ;
        }
    )

    create = this.catchAsync(
        async (req, res, next) =>{
            const {body} = req;
            const result = await this.service.create(body);
            res.json({ body: result}) ;
        }
    ) 

    update = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const {body} = req;
            const result = await this.service.update(id, body);
            res.json({ body: result}) ;
        }
    )

    delete = this.catchAsync(
        async (req, res, next) =>{
            const {id} = req.params;
            const result = await this.service.destroy(id);
            res.json({ body: result}) ;
        }
    )
 }

module.exports = BaseController;