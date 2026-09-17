CREATE TABLE `blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blocks_pair` ON `blocks` (`owner`,`target`);--> statement-breakpoint
CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`day` text NOT NULL,
	`slot` integer NOT NULL,
	`body` text NOT NULL,
	`mood` text NOT NULL,
	`region` text NOT NULL,
	`paper` text NOT NULL,
	`sticker` text NOT NULL,
	`created` integer NOT NULL,
	`receiver` text,
	`received_for` text,
	`reaction` text,
	`flagged` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entries_daily_slot` ON `entries` (`owner`,`day`,`slot`);--> statement-breakpoint
CREATE UNIQUE INDEX `entries_received_for` ON `entries` (`received_for`);--> statement-breakpoint
CREATE INDEX `entries_receiver` ON `entries` (`receiver`);--> statement-breakpoint
CREATE INDEX `entries_pool` ON `entries` (`flagged`,`receiver`,`created`);--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`entry` text NOT NULL,
	`reason` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reports_entry` ON `reports` (`owner`,`entry`);--> statement-breakpoint
CREATE TABLE `rewards` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`day` text NOT NULL,
	`kind` text NOT NULL,
	`item` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rewards_daily` ON `rewards` (`owner`,`day`,`kind`);