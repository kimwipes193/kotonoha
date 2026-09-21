CREATE TABLE `friend_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`friendship` text NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL,
	`day` text NOT NULL,
	`body` text NOT NULL,
	`mood` text NOT NULL,
	`region` text NOT NULL,
	`paper` text NOT NULL,
	`sticker` text DEFAULT '' NOT NULL,
	`stickers` text DEFAULT '[]' NOT NULL,
	`drawing` text,
	`font` text DEFAULT 'sans' NOT NULL,
	`created` integer NOT NULL,
	`matched` text,
	`read_at` integer,
	`cancelled` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friend_daily` ON `friend_entries` (`owner`,`day`);--> statement-breakpoint
CREATE UNIQUE INDEX `friend_match` ON `friend_entries` (`matched`);--> statement-breakpoint
CREATE INDEX `friend_inbox` ON `friend_entries` (`target`,`matched`);--> statement-breakpoint
CREATE TABLE `friendships` (
	`id` text PRIMARY KEY NOT NULL,
	`a` text NOT NULL,
	`b` text NOT NULL,
	`requester` text NOT NULL,
	`status` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friend_pair` ON `friendships` (`a`,`b`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`owner` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`nickname` text DEFAULT '' NOT NULL,
	`icon` text DEFAULT '🐈' NOT NULL,
	`birthday` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profile_code` ON `profiles` (`code`);
--> statement-breakpoint
CREATE TRIGGER friend_guard BEFORE INSERT ON friend_entries BEGIN
 SELECT RAISE(ABORT,'FRIEND_UNAVAILABLE') WHERE NOT EXISTS(SELECT 1 FROM friendships f WHERE f.id=NEW.friendship AND f.status='accepted' AND ((f.a=NEW.owner AND f.b=NEW.target) OR(f.b=NEW.owner AND f.a=NEW.target))) OR EXISTS(SELECT 1 FROM blocks WHERE (owner=NEW.owner AND target=NEW.target) OR(owner=NEW.target AND target=NEW.owner));
 SELECT RAISE(ABORT,'FRIEND_WAITING') WHERE EXISTS(SELECT 1 FROM friend_entries WHERE owner=NEW.owner AND read_at IS NULL AND cancelled=0);
END;
--> statement-breakpoint
CREATE TRIGGER friend_match AFTER INSERT ON friend_entries BEGIN
 UPDATE friend_entries SET matched=(SELECT id FROM friend_entries WHERE owner=NEW.target AND target=NEW.owner AND friendship=NEW.friendship AND matched IS NULL AND cancelled=0 ORDER BY created LIMIT 1) WHERE id=NEW.id;
 UPDATE friend_entries SET matched=NEW.id WHERE id=(SELECT matched FROM friend_entries WHERE id=NEW.id);
END;
--> statement-breakpoint
CREATE TRIGGER consume_friend_stickers AFTER INSERT ON friend_entries
WHEN NEW.stickers IS NOT NULL
BEGIN
 SELECT RAISE(ABORT,'INVALID_STICKERS') WHERE json_type(NEW.stickers)<>'array' OR json_array_length(NEW.stickers)>5;
 SELECT RAISE(ABORT,'STICKER_UNAVAILABLE') WHERE EXISTS (
  SELECT json_extract(value,'$.sticker') AS item FROM json_each(NEW.stickers)
  GROUP BY json_extract(value,'$.sticker')
  HAVING COUNT(*) > (SELECT COUNT(*) FROM rewards r WHERE r.owner=NEW.owner AND r.item=json_extract(value,'$.sticker') AND r.kind<>'bonus' AND r.consumed_by IS NULL)
 );
 UPDATE rewards SET consumed_by=NEW.id WHERE id IN (
  SELECT stock.id FROM (SELECT id,item,ROW_NUMBER() OVER(PARTITION BY item ORDER BY day,id) AS n FROM rewards WHERE owner=NEW.owner AND kind<>'bonus' AND consumed_by IS NULL) stock
  WHERE stock.n <= (SELECT COUNT(*) FROM json_each(NEW.stickers) WHERE json_extract(value,'$.sticker')=stock.item)
 );
END;

--> statement-breakpoint
CREATE TRIGGER birthday_entries AFTER INSERT ON entries
WHEN EXISTS(SELECT 1 FROM profiles WHERE owner=NEW.owner AND (birthday=substr(NEW.day,6) OR (birthday='02-29' AND substr(NEW.day,6)='02-28' AND strftime('%d',date(substr(NEW.day,1,4)||'-03-01','-1 day'))='28')))
BEGIN
 INSERT OR IGNORE INTO rewards(id,owner,day,kind,item) SELECT NEW.id||'-birthday-'||n,NEW.owner,substr(NEW.day,1,4),'birthday-'||n,'🎂' FROM (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4);
END;

--> statement-breakpoint
CREATE TRIGGER birthday_friend_entries AFTER INSERT ON friend_entries
WHEN EXISTS(SELECT 1 FROM profiles WHERE owner=NEW.owner AND (birthday=substr(NEW.day,6) OR (birthday='02-29' AND substr(NEW.day,6)='02-28' AND strftime('%d',date(substr(NEW.day,1,4)||'-03-01','-1 day'))='28')))
BEGIN
 INSERT OR IGNORE INTO rewards(id,owner,day,kind,item) SELECT NEW.id||'-birthday-'||n,NEW.owner,substr(NEW.day,1,4),'birthday-'||n,'🎂' FROM (SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4);
END;
