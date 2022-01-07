class BaseServices{
    constructor(Repository){
        this.repository = Repository;
    }

    async getById(id){
        const entity = await this.repository.getById(id);
        if(!entity) throw new Error('New error, dont found');

        return entity;
    }

    async getAll(){
        const entities = await this.repository.getAll();
        return entities;
    }

    async create(body){
        const entities = await this.repository.create(body);
        return entities;
    }

    async update(id, body){
        await this.getById(id);
        const entities = await this.repository.update({params: body, options: {where:{id:id}}});
        return entities;
    }

    async destroy(id){
        await this.getById(id);
        const entities = await this.repository.destroy({options: {where:{id:id}}});
        return entities;
    }
}

module.exports = BaseServices;