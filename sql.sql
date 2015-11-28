
/*
    users taflan
*/
DROP TABLE users;

CREATE TABLE users(
    id serial NOT NULL,
    username varchar( 32 ),
    salt varchar( 256 ),
    hash varchar( 256 ),
    date varchar( 16 ),
    CONSTRAINT users_pkey PRIMARY KEY ( id ),
    CONSTRAINT users_user UNIQUE ( username )
);

/* 
    diary TAFLAN
*/
DROP TABLE diary;

CREATE TABLE diary(
    "userID" integer,
    id serial NOT NULL,
    title character varying(50),
    text text,
    public boolean,
    date character varying(16),
    "dateSQL" timestamp with time zone,
    CONSTRAINT diary_pkey PRIMARY KEY (id),
    CONSTRAINT "FK_users_userID" FOREIGN KEY ("userID")
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);