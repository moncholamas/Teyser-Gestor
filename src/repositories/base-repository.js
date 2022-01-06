
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
}

module.exports =  BaseRepository;