DROP TABLE users;

CREATE TABLE users(
    id serial NOT NULL,
    username varchar( 32 ),
    salt varchar( 256 ),
    hash varchar( 256 ),
    date timestamp with time zone,
    CONSTRAINT users_pkey PRIMARY KEY ( id ),
    CONSTRAINT users_user UNIQUE ( username )
);

DROP TABLE diary;

CREATE TABLE diary(
    "userID" int,
    id serial NOT NULL,
    title varchar( 50 ),
    public boolean, 
    text text,
    date timestamp with time zone,
    CONSTRAINT diary_pkey PRIMARY KEY ( id ),
    CONSTRAINT "FK_users_userID" FOREIGN KEY ( "userID" )
        REFERENCES users( id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);