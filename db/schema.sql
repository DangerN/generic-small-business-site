CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


drop table if exists products;

create table products (
	id serial primary key,
	name text not null,
	description text not null,
	catagory text not null default 'General',
	price money not null,
	stock int default 0,
	potential int default 0,
	oversell bool default true,
	media_links varchar[] not null,
	ship_cost money default 0
);

insert into products (name, description, price, media_links)
values ('Potato', 'It''s just a potato, seriously. Move along. Nothing to see here', 10.00, '{"yolo", "yeet"}');

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
	brandName text,
	brandStyle json,
	catagories json
);

insert into meta (brandName, brandStyle, catagories) values
('Longboard Eternal', '{"fontFamily": "\"Permanent Marker\", cursive"}', '{
        "Completes": ["Cruiser", "Downhill", "Freeride"],
        "Decks": [],
        "Wheels": [],
        "Trucks": ["TKP","RKP"],
        "Bearings": [],
        "Hardware": [],
        "Safety": ["Helmets", "Pads", "Gloves"]
      }' );



select * from users;
