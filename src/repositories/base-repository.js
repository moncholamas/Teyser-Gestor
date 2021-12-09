
class BaseRepository {
    constructor(model){
        this.model = model;
    }

    async getById(id){
        return await this.model.findByPk(id);
    }
    
    async getAll(){
        return await this.model.findAll();
    }
}

module.exports = {
    BaseRepository
};