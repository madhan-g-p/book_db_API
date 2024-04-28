CREATE TABLE books.details
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title character varying(255) NOT NULL,
    isbn bigint UNIQUE,
    publication_date date,
   created_time TIMESTAMP NOT NULL DEFAULT TIMEZONE('UTC',NOW()),
   edited_time TIMESTAMP
);

