const catchAsync = require('../utils/catchAsync');

class BaseController {
    constructor(Service){
        this.catchAsync = catchAsync;
        this.service = Service;
    }
    
}

module.exports = BaseController;