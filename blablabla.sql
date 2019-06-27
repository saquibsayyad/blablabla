--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

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

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.social_accounts (
    id integer NOT NULL,
    account_key text NOT NULL,
    type character varying(20) NOT NULL,
    affiliate character varying(30) NOT NULL,
    last_record_id bigint
);


CREATE TABLE public.tweets (
    id bigint NOT NULL,
    affiliate character varying(30) NOT NULL,
    tweet text NOT NULL,
    tweet_time timestamp without time zone NOT NULL,
    score numeric,
    language character varying(3) NOT NULL,
    magnitude numeric
);


ALTER TABLE ONLY public.social_accounts
    ADD CONSTRAINT social_accounts_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.tweets
    ADD CONSTRAINT tweets_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

