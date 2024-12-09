
CREATE TABLE user (
  address VARCHAR(255) PRIMARY KEY,
  match_id INTEGER,
  FOREIGN KEY (match_id) REFERENCES match(match_id)
);

CREATE TABLE match (
  match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user1_addr VARCHAR(255),
  user2_addr VARCHAR(255),
  user1_token VARCHAR(255),
  user2_token VARCHAR(255),
  game_id INTEGER,
  FOREIGN KEY (user1_addr) REFERENCES user(address),
  FOREIGN KEY (user2_addr) REFERENCES user(address),
  FOREIGN KEY (game_id) REFERENCES game(game_id)
);

CREATE TABLE game (
  game_id INTEGER PRIMARY KEY AUTOINCREMENT,
  problem0_id INTEGER,
  problem1_id INTEGER,
  problem2_id INTEGER,
  start_time VARCHAR(255),
  round INTEGER,
  user1_addr VARCHAR(255),
  user2_addr VARCHAR(255),
  user1_state INTEGER,
  user2_state INTEGER,
  user1_score INTEGER,
  user2_score INTEGER,
  result INTEGER,
  FOREIGN KEY (user1_addr) REFERENCES user(address),
  FOREIGN KEY (user2_addr) REFERENCES user(address),
  FOREIGN KEY (problem0_id) REFERENCES problem(problems_id),
  FOREIGN KEY (problem1_id) REFERENCES problem(problems_id),
  FOREIGN KEY (problem2_id) REFERENCES problem(problems_id)
);

CREATE TABLE problem (
  problems_id INTEGER PRIMARY KEY AUTOINCREMENT,
  q0 VARCHAR(255),
  q1 VARCHAR(255),
  q2 VARCHAR(255),
  q3 VARCHAR(255),
  q4 VARCHAR(255),
  answer INTEGER
);
