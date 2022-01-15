const throwError = require("../utils/throwError");
const status = require('../config/constants/status');
const message = require('../config/constants/message');

class BaseServices{
    constructor(Repository){
        this.repository = Repository;
        this.throwError = throwError;
        this.status = status;
        this.message = message;
    }

    async getById(id){
        const entity = await this.repository.getById(id);
        if(!entity) this.throwError(this.status.NOT_FOUND,this.message.NOT_FOUND,this.repository);
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