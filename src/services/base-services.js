class BaseServices{
    constructor(Repository){
        this.repository = Repository;
    }

    async getById(id){
        const entity = await this.repository.getById(id);
        return entity;
    }
}

export {
    BaseServices
}