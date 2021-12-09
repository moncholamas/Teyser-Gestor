import {BaseServices} from './base-services'

class OperatorService extends BaseServices{
    constructor({OperatorRepository}){
        super(OperatorRepository);
        this._operatorRepository = OperatorRepository;
    }
    
}

export {
    OperatorService
}