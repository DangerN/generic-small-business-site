CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


drop table if exists catagories;

create table catagories (
  id serial primary key,
  name text not null
);

insert into catagories (name) values ('Completes');

drop table if exists specs;

create table specs (
  id serial primary key,
  type text not null,
  unit text not null,
  filter json
);

insert into specs (type, unit, filter)
values ('Length', 'in', '{"method":"range","values":"numeric"}');

drop table if exists catagories_specs;

create table catagories_specs (
  spec_id int references specs not null,
  catagory_id int references catagories not null
);

insert into catagories_specs values (1, 1);

drop table if exists products;

create table products (
	id serial primary key,
	name text not null,
	description text not null,
	catagory int references catagories not null,
  specs_values json not null,
	price money not null,
	stock int default 0,
	potential int default 0,
	oversell bool default true,
	media_links varchar[] not null,
	ship_cost money default 0
);

insert into products (name, description, price, media_links, catagory, specs_values)
values (
  'MADRID DTF 39" FLAMINGOS',
  '“A major influence that inspires me are all the Asian styles of craft work. The art is very meticulous and the artists pour their heart and soul into every piece, no matter how small it is. I base all of my animal characters off different symbols or gods found in Asian culture. My artworks are all vector base and are digitally made. It involves a lot of time to make but the result is that the work always looks clean and never pixelated.” -Artist Marc Clenn',
  209.95,
  '{"CDEC20LONFLA_1024x1024.jpg", "CDEC20LONFLADRO_1024x1024.jpg", "CDEC20LONFLA_2_1024x1024.jpg"}',
  1,
  '{"Length":"39"}'
);

drop table if exists users;

create table users (
	id serial primary key,
	email text not null,
	password text not null,
	first_name text,
	last_name text,
	admin bool default false
);

insert into users (email, password)
values
('test@test.com', '$2y$10$kwvV8.30mPMBYdYjR9xMBOLvWN6TkG9ulqZtmePKygj9FmTgRCSWW');

insert into users (email, password, admin)
values
('admintest@test.com', '$2y$10$kwvV8.30mPMBYdYjR9xMBOLvWN6TkG9ulqZtmePKygj9FmTgRCSWW', true);

drop table if exists transactions;

create table transactions (
	id serial primary key,
	user_id int references users not null,
	product_ids int[] not null,
	billing_info jsonb,
	shipping_info jsonb,
	ship_cost money,
	sub_total money,
	tax money,
	total money,
	finalized bool default false,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create trigger set_timestamp
before update on transactions
for each row
execute procedure trigger_set_timestamp();

insert into transactions (user_id, product_ids)
values (1, '{1}');

drop table if exists posts;

create table posts (
 	id serial,
 	created_at timestamptz default now(),
 	title text not null,
 	body text not null
 );

insert into posts (title, body)
values ('test', 'test');

drop table if exists meta;

create table meta (
	brandname text,
	tagline text,
	brandstyle json
);

insert into meta (brandname, brandstyle, tagline) values
('Longboard Eternal', '{"fontFamily": "\"Permanent Marker\", cursive"}',
'Rail slide Bucky Lasek stalefish heel flip frigid air hospital flip manual Kevin Harris. Nose 180 mute-air nosepicker lien air goofy footed berm. Hospital flip hurricane rail slide deck kidney tic-tac nose-bump Alan Gelfand. Skate or die slide crailtap rad Supersonic Skate Camp hospital flip shinner front foot impossible. Lip Jason Wilson rocket air manual chicken wing coping casper fast plant. Cess slide backside nollie nose bump switch boardslide coping. Nosebone Jerry Hsu grind betty bank hospital flip 180 carve. Casper slide air hard flip ollie hole yeah Alan Gelfand salad grind regular footed. Half-flip casper coping casper slide wall ride boned out chicken wing. Vert wax stalefish trucks boneless boned out ollie.' );

select * from users;
