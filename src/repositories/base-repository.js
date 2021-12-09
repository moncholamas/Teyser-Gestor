
class BaseRepository {
    constructor(model){
        this.model = model;
    }

    async getById(id){
        return await this.model.findByPk(id);
    }
}

module.exports = {
    BaseRepository
};