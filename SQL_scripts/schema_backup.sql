--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: books; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA books;


ALTER SCHEMA books OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: details; Type: TABLE; Schema: books; Owner: postgres
--

CREATE TABLE books.details (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    isbn bigint,
    publication_date date,
    created_time timestamp without time zone DEFAULT timezone('UTC'::text, now()) NOT NULL,
    edited_time timestamp without time zone
);


ALTER TABLE books.details OWNER TO postgres;

--
-- Name: details_id_seq; Type: SEQUENCE; Schema: books; Owner: postgres
--

ALTER TABLE books.details ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME books.details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: details details_isbn_key; Type: CONSTRAINT; Schema: books; Owner: postgres
--

ALTER TABLE ONLY books.details
    ADD CONSTRAINT details_isbn_key UNIQUE (isbn);


--
-- Name: details details_pkey; Type: CONSTRAINT; Schema: books; Owner: postgres
--

ALTER TABLE ONLY books.details
    ADD CONSTRAINT details_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

