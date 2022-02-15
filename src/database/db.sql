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



drop table sexo_de_usuario;
drop table_residencia_de_usuario;
drop table categoria_de_servicio;
drop table profesion;
drop table usuario;
drop table servicio;
drop table profesion_usuario;

create table sexo_de_usuario(
	codigo_de_sexo varchar2(11),
	nombre_de_sexo varchar2(11),
	constraint restriccion_sexo_uno check (codigo_de_sexo is not null),
	constraint restriccion_sexo_dos check (nombre_de_sexo is not null),
	constraint pk_sexo_de_usuario primary key(codigo_de_sexo)
) tablespace cool_work;

create table residencia_de_usuario(
	codigo_postal varchar2(15),
	nombre_de_residencia varchar2(30),
	constraint restriccion_residencia_uno check (codigo_postal is not null),
	constraint restriccion_residencia_dos check (nombre_de_residencia is not null),
	constraint pk_residencia_de_usuario primary key(codigo_postal)
) tablespace cool_work;

create table categoria_de_servicio(
	codigo_categoria_de_servicio varchar2(30),
	nombre_categoria_de_servicio varchar2(30),
	constraint restriccion_categoria_uno check(codigo_categoria_de_servicio is not null),
        constraint restriccion_categoria_dos check (nombre_categoria_de_servicio is not null),
	constraint pk_categoria_de_servicio primary key(codigo_categoria_de_servicio)
) tablespace cool_work;

create table profesion(
	codigo_profesion varchar2(50),
	nombre_profesion varchar2(50),
	constraint restriccion_profesion_uno check (codigo_profesion is not null),
	constraint restriccion_profesion_dos check (nombre_profesion is not null),
	constraint pk_profesion primary key(codigo_profesion)
) tablespace cool_work;

create table usuario(
	identificacion_usuario varchar2(20),
	nombre_usuario varchar2(30),
	primer_apellido_usuario varchar2(20),
	segundo_apellido_usuario varchar2(20),
	telefono_usuario numeric(10),
	fecha_nacimiento_usuario date,
	codigo_sexo_usuario varchar2(11),
	codigo_residencia_usuario varchar(6),
	constraint restriccion_usuario_uno check (identificacion_usuario is not null),
	constraint restriccion_usuario_dos check (nombre_usuario is not null),
	constraint restriccion_usuario_tres check (primer_apellido_usuario is not null),
	constraint restriccion_usuario_cuatro check (segundo_apellido_usuario is not null),
	constraint restriccion_usuario_cinco check (telefono_usuario is not null),
	constraint restriccion_usuario_seis check (fecha_nacimiento_usuario is not null),
	constraint restriccion_usuario_siete check (codigo_sexo_usuario is not null),
	constraint restriccion_usuario_ocho check (codigo_residencia_usuario is not null),
	constraint pk_usuario primary key(identificacion_usuario),
	constraint fk_usuario_codigo_sexo foreign key(codigo_sexo_usuario) references sexo_de_usuario(codigo_de_sexo),
	constraint fk_usuario_codigo_residencia foreign key(codigo_residencia_usuario) references residencia_de_usuario(codigo_postal)
) tablespace cool_work;

create table servicio(
	identificacion_registro varchar2(10),
	nombre_servicio varchar2(30),
	descripcion_servicio varchar2(200),
	identificacion_servicio_usuario varchar2(20),
	Codigo_servicio_categoria varchar2(30),
	constraint restriccion_servicio_uno check (identificacion_registro is not null),
	constraint restriccion_servicio_dos check (nombre_servicio is not null),
	constraint restriccion_servicio_tres check (descripcion_servicio is not null),
	constraint restriccion_servicio_cuatro check (identificacion_servicio_usuario is not null),
	constraint restriccion_servicio_cinco check (codigo_servicio_categoria is not null),
	constraint pk_servicio primary key(identificacion_registro),
	constraint fk_servicio foreign key(Codigo_servicio_categoria) references categoria_de_servicio(codigo_categoria_de_servicio),
	constraint fk_servicio_usuario foreign key(identificacion_servicio_usuario) references usuario(identificacion_usuario)
) tablespace cool_work;

create table profesion_usuario(
	usuario_identificacion_usuario varchar2(20),
	profesion_codigo_profesion varchar2(50),
	constraint restriccion_profesion_usuario_uno check (usuario_identificacion_usuario is not null),
	constraint restriccion_profesion_usuario_dos check (profesion_codigo_profesion is not null),
	constraint pk_profesion_usuario primary key(usuario_identificacion_usuario, profesion_codigo_profesion),
	constraint fk_profesion_usuario_uno foreign key(usuario_identificacion_usuario) references usuario(identificacion_usuario),
	constraint fk_profesion_usuario_dos foreign key(profesion_codigo_profesion) references profesion(codigo_profesion)
) tablespace cool_work;