process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

var validPayload = {
    kmom: "Kmom01",
    info: "Hey"
}

var missingKmom = {
    kmom: "",
    info: "Hey"
}

var missingInfo = {
    kmom: "Kmom01",
    info: ""
}

describe('Edit', () => {
    describe('GET /reports/edit/Kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom01")
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

    describe('GET /reports/edit/Kmom02', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom02")
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

    describe('GET /reports/edit/Kmom03', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom03")
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

    describe('GET /reports/edit/Kmom04', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom04")
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

    describe('GET /reports/edit/Kmom05', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom05")
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

    describe('GET /reports/edit/Kmom06', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom06")
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

    describe('GET /reports/edit/Kmom10', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/edit/Kmom10")
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

    describe('POST /reports/edit', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports/edit")
                .send(validPayload)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.message.should.be.an("string");
                    res.body.data.message.should.equal("Info succesfully edited.");

                    done();
                });
        });
    });

    describe('POST /reports/edit', () => {
        it('401 Missing Kmom', (done) => {
            chai.request(server)
                .post("/reports/edit")
                .send(missingKmom)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.equal("Kmom or info missing");

                    done();
                });
        });
    });

    describe('POST /reports/edit', () => {
        it('401 Missing Info', (done) => {
            chai.request(server)
                .post("/reports/edit")
                .send(missingInfo)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.equal("Kmom or info missing");

                    done();
                });
        });
    });

});
