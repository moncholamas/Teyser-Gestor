
class BaseRepository {
    constructor(Model){
        this.model = Model;
    }

    async getById(id){
        return await this.model.findByPk(id);
    }
    
    async getAll(){
        return await this.model.findAll();
    }

    async create(body){
        return await this.model.create(body);
    }
    
    async update({params, options}){
        console.log(params, options)
        return await this.model.update(params,options);
    }

    async destroy({options}){
        return await this.model.destroy(options);
    }
}

module.exports =  BaseRepository;