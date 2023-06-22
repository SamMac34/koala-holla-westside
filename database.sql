CREATE TABLE "koalas" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "gender" VARCHAR(80) NOT NULL,
    "age" INTEGER,
    "ready_to_transer" VARCHAR(80) NOT NULL,
    "notes" VARCHAR(80) NOT NULL
);

INSERT INTO "koalas" 
	("name", "gender", "age","ready_to_transer","notes") 
VALUES 
	('Scotty','M',4,'Y','Born in Guatemala'),
	('Jean', 'F',5,'Y','Allergic to lots of lava'),
	('Ororo','F',7,'N','Loves listening to Paula (Abdul)'),
	('Logan','M',15,'N','Loves the sauna'),
	('Charlie','M',9,'Y','Favorite band is Nirvana'),
	('Betsy','F',4,'Y','Has a pet iguana');