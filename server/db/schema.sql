CREATE DATABASE team_builder_db;

CREATE TABLE teams(
    team_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    team_leader VARCHAR(30) NOT NULL,
    members TEXT [],
    points INT NOT NULL DEFAULT 0
);

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(255) NOT NULL,
    points SMALLINT NOT NULL,
    due_date DATE NOT NULL
);