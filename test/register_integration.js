process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("../db/database.js");

console.log("Test db: ", db);

chai.should();

chai.use(chaiHttp);

let validUser =  {
    email: "test@test.se",
    password: "1234"
}

let duplicateUser =  {
    email: "duplicate@test.se",
    password: "1234"
}

let emptyEmail =  {
    email: "",
    password: "1234"
}

let missingEmail =  {
    password: "1234"
}

let emptyPassword =  {
    email: "test@test.se",
    password: ""
}

let missingPassword =  {
    email: "test@test.se"
}

describe('Register', () => {
    before(() => {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            duplicateUser.email,
            duplicateUser.password,
            (err) => {
                if (err) {
                    console.error("Could not insert user into db", err.message);
                }
            });
    });

    describe('POST /register', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.msg.should.be.an("string");
                    res.body.data.msg.should.equal("New user succesfully registered");

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('500 Duplicate email in DB', (done) => {
            chai.request(server)
                .post("/register")
                .send(duplicateUser)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.equal("Database error");
                    console.log(res.body.errors.detail);

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('400 Missing Email', (done) => {
            chai.request(server)
                .post("/register")
                .send(missingEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.detail.should.be.an("string");
                    res.body.errors.title.should.equal("Bad Request");
                    res.body.errors.detail.should.equal("Email missing in request");

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('400 Empty Email', (done) => {
            chai.request(server)
                .post("/register")
                .send(emptyEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.detail.should.be.an("string");
                    res.body.errors.title.should.equal("Bad Request");
                    res.body.errors.detail.should.equal("Email missing in request");
                    // console.log(res.body.errors.detail);

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('400 Missing Password', (done) => {
            chai.request(server)
                .post("/register")
                .send(missingPassword)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.detail.should.be.an("string");
                    res.body.errors.title.should.equal("Bad Request");
                    res.body.errors.detail.should.equal("Password missing in request");

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('400 Empty Password', (done) => {
            chai.request(server)
                .post("/register")
                .send(emptyPassword)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.detail.should.be.an("string");
                    res.body.errors.title.should.equal("Bad Request");
                    res.body.errors.detail.should.equal("Password missing in request");

                    done();
                });
        });
    });
});
