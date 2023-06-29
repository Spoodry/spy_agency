CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_type INT NOT NULL,
	email VARCHAR(256) NOT NULL,
	password VARCHAR(256) NOT NULL,
	name VARCHAR(128),
	description VARCHAR(512),
	id_manager INT,
	active TINYINT NOT NULL DEFAULT 1,
	created_at DATETIME,
	updated_at DATETIME
);
	
CREATE TABLE types_users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(64)
);

ALTER TABLE users
ADD CONSTRAINT fk_type_user
FOREIGN KEY (id_type) REFERENCES types_users(id);

CREATE TABLE hits(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_assignee INT NOT NULL,
	description VARCHAR(256),
	target_name VARCHAR(128),
	id_status INT NOT NULL,
	id_creator INT NOT NULL,
	created_at DATETIME,
	updated_at DATETIME
);

ALTER TABLE hits
ADD CONSTRAINT fk_assignee
FOREIGN KEY (id_assignee) REFERENCES users(id);

ALTER TABLE hits
ADD CONSTRAINT fk_creator
FOREIGN KEY (id_creator) REFERENCES users(id);

CREATE TABLE status_hits(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(64)
);

ALTER TABLE hits
ADD CONSTRAINT fk_status
FOREIGN KEY (id_status) REFERENCES status_hits(id);

INSERT INTO types_users(name) VALUES('boss');
INSERT INTO types_users(name) VALUES('manager');
INSERT INTO types_users(name) VALUES('hitman');

SELECT * FROM types_users;

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(1, 'boss@spy.com', MD5('1234'), 'saitama', 0, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(2, 'genos@spy.com', MD5('1234'), 'genos', 1, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(2, 'king@spy.com', MD5('1234'), 'king', 1, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(2, 'dog@spy.com', MD5('1234'), 'watchdog man', 1, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'aang@spy.com', MD5('1234'), 'aang', 2, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'zoka@spy.com', MD5('1234'), 'zuko', 2, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'katara@spy.com', MD5('1234'), 'katara', 2, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'walter@spy.com', MD5('1234'), 'walter', 3, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'jesse@spy.com', MD5('1234'), 'jesse', 3, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'tuco@spy.com', MD5('1234'), 'tuco', 3, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'harry@spy.com', MD5('1234'), 'harry', 4, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'ron@spy.com', MD5('1234'), 'ron', 4, NOW(), NOW());

INSERT INTO users(id_type, email, password, name, id_manager, created_at, updated_at) VALUES(3, 'hermione@spy.com', MD5('1234'), 'hermione', 4, NOW(), NOW());

CREATE VIEW vw_users AS
SELECT u.id, u.id_type, t.name AS type, u.email, u.password, u.name, u.description, u.id_manager, IFNULL(um.name, 'no manager') AS manager, u.active, u.created_at, u.updated_at FROM users AS u 
LEFT JOIN types_users AS t ON u.id_type = t.id
LEFT JOIN users AS um ON u.id_manager = um.id;

SELECT * FROM hits;

SELECT * FROM vw_hits;

CREATE VIEW vw_hits AS
SELECT h.id, h.id_assignee, ua.name AS assignee, ua.id_manager, h.description, h.target_name, h.id_status, sh.name AS status, h.id_creator, uc.name AS creator, h.created_at, h.updated_at FROM hits AS h 
LEFT JOIN users AS ua ON h.id_assignee = ua.id
LEFT JOIN users AS uc ON h.id_creator = uc.id
LEFT JOIN status_hits AS sh ON h.id_status = sh.id;

INSERT INTO hits(id_assignee, description, target_name, id_status, id_creator, created_at, updated_at) VALUES(5, 'with air control', 'ozai', 1, 2, NOW(), NOW());

INSERT INTO hits(id_assignee, description, target_name, id_status, id_creator, created_at, updated_at) VALUES(6, 'with water control', 'azula', 1, 2, NOW(), NOW());

INSERT INTO status_hits(name) VALUES('assigned');
INSERT INTO status_hits(name) VALUES('failed');
INSERT INTO status_hits(name) VALUES('completed');

SELECT * FROM status_hits;

SELECT * FROM vw_users;

SELECT * FROM hits;

ALTER TABLE users ADD CONSTRAINT uk_email UNIQUE (email);

SELECT * FROM users;