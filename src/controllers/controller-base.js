class BaseController {
    constructor(Service){
        this.service = Service;
        console.log('en el super', this.service)
    }
}

module.exports = BaseController;