CREATE DATABASE task_db;

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    description VARCHAR(255) UNIQUE
);