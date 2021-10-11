process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /reports/week/1', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom01");

                    done();
                });
        });
    });

    describe('GET /reports/week/2', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom02");

                    done();
                });
        });
    });

    describe('GET /reports/week/3', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/3")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom03");

                    done();
                });
        });
    });

    describe('GET /reports/week/4', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/4")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom04");

                    done();
                });
        });
    });

    describe('GET /reports/week/5', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/5")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom05");

                    done();
                });
        });
    });

    describe('GET /reports/week/6', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/6")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom06");

                    done();
                });
        });
    });

    describe('GET /reports/week/10', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/10")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.kmom.should.be.an("string");
                    res.body.data.kmom.should.equal("Kmom10");

                    done();
                });
        });
    });
});
