DROP TABLESPACE cool_work INCLUDING CONTENTS and DATAFILES;

ALTER SESSION SET CONTAINER=CDB$ROOT;

CREATE TABLESPACE cool_work LOGGING
DATAFILE 'C:\ejercicio\PPI_BD\df_cool_work.dbf' size 2M
extent management local segment space management auto;

alter session set "_ORACLE_SCRIPT"=true;

CREATE user admin profile default 
identified by 123
default tablespace cool_work 
temporary tablespace temp 
account unlock;

grant connect, resource,dba to admin;

connect admin/123

show user;