COPY menuitems FROM '/Users/michaelsu/Desktop/SDC/menu/dbgen/menuitems.csv' WITH (FORMAT csv);
\COPY menuitems FROM '/home/ec2-user/menuitems.csv' WITH (FORMAT csv);

create table restaurantid (id serial PRIMARY KEY);

CREATE TABLE menuitems (_id INTEGER,restaurantId INTEGER, item VARCHAR(25),description VARCHAR(255),menu VARCHAR(25),type VARCHAR(25),price MONEY);

menus=# select * from menuitems where restaurantid=8948375;

menus=# select * from menuitems where item='Cotton Chicken';

-- scp -i your-ec2-key.pem -r /Users/Desktop/SDC/menu/dbgen/menuitems.csv ec2-user@your-ec2-address:
