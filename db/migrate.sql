DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rented;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS history;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(60) NOT NULL,
    role VARCHAR(10) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS rented (
    id INTEGER PRIMARY KEY,
    equipment_id VARCHAR(60) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    rent_date VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    amount INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    picture VARCHAR(255),
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY,
    event_date VARCHAR(60) NOT NULL,
    equipment_id VARCHAR(60) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    UNIQUE(id)
);


INSERT INTO users (email, password, role) VALUES (
    "fridasaralinnea@gmail.com",
    "$2a$10$1XNr6R8KZV.pm8D9klIq7.SPPSML.3CyO01/JRxNchNZNljUPPV4.",
    "superuser"
);

INSERT INTO users (email, password, role) VALUES (
    "fridasaralinnea@yahoo.com",
    "$2a$10$1XNr6R8KZV.pm8D9klIq7.SPPSML.3CyO01/JRxNchNZNljUPPV4.",
    "admin"
);

INSERT INTO equipment (name, amount, stock) VALUES (
    "GoPro7",
    "2",
    "2"
);

INSERT INTO equipment (name, amount, stock) VALUES (
    "Nikon",
    "2",
    "2"
);
