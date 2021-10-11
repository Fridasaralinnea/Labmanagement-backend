process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const bcrypt = require('bcryptjs');
const db = require("../db/database.js");

const saltRounds = 10;

console.log("Test db: ", db);

chai.should();

chai.use(chaiHttp);

let validUser =  {
    email: "test1@test.se",
    password: "1234"
}

let invalidEmail = {
    email: "test2@test.se",
    password: "1234"
}

let invalidPassword =  {
    email: "test1@test.se",
    password: "123"
}

describe('Login', () => {
    before(() => {
        bcrypt.hash(validUser.password, saltRounds, function(err, hash, res) {
            if (err) {
                console.log("bcrypt error");
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }
            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
                validUser.email,
                hash,
                (err) => {
                    if (err) {
                        console.error("Could not insert user into db", err.message);
                    }
                });
        });
    });

    describe('POST /login', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.be.an("object");
                    res.body.msg.should.be.an("string");
                    res.body.msg.should.equal("User succesfully logged in");

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('400 Invalid Email', (done) => {
            chai.request(server)
                .post("/login")
                .send(invalidEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.detail.should.be.an("string");
                    res.body.errors.title.should.equal("Email invalid");
                    res.body.errors.detail.should.equal("Could not find user: " + invalidEmail.email);

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('400 Invalid Password', (done) => {
            chai.request(server)
                .post("/login")
                .send(invalidPassword)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.detail.should.be.an("string");
                    res.body.errors.title.should.equal("Login Error");
                    res.body.errors.detail.should.equal("Error during login");

                    done();
                });
        });
    });
});
