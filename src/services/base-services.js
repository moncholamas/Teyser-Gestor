class BaseServices{
    constructor(Repository){
        this.repository = Repository;
    }

    async getById(id){
        const entity = await this.repository.getById(id);
        if(!entity) throw new Error('New error, dont found')

        return entity;
    }

    async getAll(){
        const entities = await this.repository.getAll();
        return entities;
    }
}

module.exports = BaseServices;