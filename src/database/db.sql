ALTER SESSION SET CONTAINER=CDB$ROOT;

show con_name;

dropt table sexo;
drop table residencia;
drop table categoria;
drop table usuario;
drop table servicio;
drop table profesion;
drop table profesion_usuario;
drop tablespace coolwork;

CREATE TABLESPACE cool_work LOGGING
DATAFILE 'C:\Users\garci\OneDrive\Desktop\PCJIC\semestreDos\BD\PPI\DB\df_cool_work.dbf' size 2M
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

create table sexo(
	codigo_sexo varchar2(1) not null,
	nombre_sexo varchar2(7) not null,
	constraint pk_sexo primary key(codigo_sexo)
);

create table residencia(
	codigo_postal varchar2(6) not null,
	nombre_residencia varchar2(30) not null,
	constraint pk_residencia primary key(codigo_postal)
);

create table categoria(
	codigo_categoria varchar2(2) not null,
	nombre_categoria varchar2(30) not null,
	constraint pk_categoria primary key(codigo_categoria)
);

create table usuario(
	identificacion_usuario varchar2(20) not null,
	nombre_usuario varchar2(30) not null,
	telefono_usuario numeric(10) not null,
	fecha_nacimiento_usuario date not null,
	codigo_sexo_usuario varchar2(1) not null,
	codigo_residencia_usuario varchar(6) not null,
	constraint pk_usuario primary key(identificacion_usuario),
	constraint fk_usuario_codigo_sexo foreign key(codigo_sexo_usuario) references sexo(codigo_sexo),
	constraint fk_usuario_codigo_residencia foreign key(codigo_residencia_usuario) references residencia(codigo_postal)
);

create table servicio(
	identificacion_registro varchar2(10) not null,
	nombre_servicio varchar2(30) not null,
	descripcion_servicio varchar2(2000) not null,
	identificacion_servicio_usuario varchar2(20) not null,
	Codigo_servicio_categoria varchar2(2) not null,
	constraint pk_servicio primary key(identificacion_registro),
	constraint fk_servicio foreign key(Codigo_servicio_categoria) references categoria(codigo_categoria),
	constraint fk_servicio_usuario foreign key(identificacion_servicio_usuario) references usuario(identificacion_usuario)
);

create table profesion(
	codigo_profesion varchar2(2) not null,
	nombre_profesion varchar2(50) not null,
	constraint pk_profesion primary key(codigo_profesion)
);

create table profesion_usuario(
	identificacion_profesion_usuario varchar2(20) not null,
	codigo_profesion varchar2(2) not null, 
	experiencia_laboral varchar2(1000) not null,
	constraint pk_profesion_usuario primary key(identificacion_profesion_usuario, codigo_profesion),
	constraint fk_profesion_usuario_id_usuario foreign key(identificacion_profesion_usuario) references usuario(identificacion_usuario),
	constraint fk_profesion_usuario_cod_profesion foreign key(codigo_profesion) references profesion(codigo_profesion)
);