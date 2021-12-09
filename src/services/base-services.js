class BaseServices{
    constructor(Repository){
        this.repository = Repository;
    }

    async getById(id){
        const entity = await this.repository.getById(id);
        return entity;
    }

    async getAll(){
        const entities = await this.repository.getAll();
        return entities;
    }
}

export {
    BaseServices
}