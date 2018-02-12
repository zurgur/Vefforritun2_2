CREATE TABLE form(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    ssn text,
    date timestamp DEFAULT current_timestamp,
    amount INT
);