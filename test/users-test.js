const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../src/index');


chai.use(chaiHttp);


describe('suite test for users', ()=>{
    describe('get', ()=>{
        it('una prueba fake', (done)=>{
            chai
                .request('http://localhost:3000')
                .get('/api/v1/users')
                .end((err,res)=>{
                    assert.equal('a','a');
                })
                done();
        })
    })
})