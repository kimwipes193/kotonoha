CREATE TABLE `friend_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`friendship` text NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL,
	`client_id` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL,
	`read_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dm_retry` ON `friend_messages` (`owner`,`client_id`);--> statement-breakpoint
CREATE INDEX `dm_thread` ON `friend_messages` (`friendship`,`created`,`id`);--> statement-breakpoint
CREATE INDEX `dm_sender` ON `friend_messages` (`owner`,`created`);--> statement-breakpoint
CREATE INDEX `dm_unread` ON `friend_messages` (`target`,`friendship`,`read_at`);--> statement-breakpoint
CREATE TRIGGER dm_guard BEFORE INSERT ON friend_messages BEGIN
 SELECT RAISE(ABORT,'FRIEND_UNAVAILABLE') WHERE NOT EXISTS(SELECT 1 FROM friendships f WHERE f.id=NEW.friendship AND f.status='accepted' AND ((f.a=NEW.owner AND f.b=NEW.target) OR(f.b=NEW.owner AND f.a=NEW.target))) OR EXISTS(SELECT 1 FROM blocks WHERE (owner=NEW.owner AND target=NEW.target) OR(owner=NEW.target AND target=NEW.owner));
 SELECT RAISE(ABORT,'DM_RATE_LIMIT') WHERE (SELECT COUNT(*) FROM friend_messages WHERE owner=NEW.owner AND created>NEW.created-60000)>=30 OR (SELECT COUNT(*) FROM friend_messages WHERE owner=NEW.owner AND created>NEW.created-86400000)>=500;
END;
