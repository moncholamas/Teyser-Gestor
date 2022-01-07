const catchAsync = require('../utils/catchAsync');

class BaseController {
    constructor(){
        this.catchAsync = catchAsync;
    }
    
}

module.exports = BaseController;