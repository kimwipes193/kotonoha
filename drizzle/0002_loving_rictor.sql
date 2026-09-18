CREATE TABLE `pet_events` (
	`id` text NOT NULL,
	`owner` text NOT NULL,
	`week` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pet_event_unique` ON `pet_events` (`owner`,`id`);--> statement-breakpoint
CREATE INDEX `pet_owner_week` ON `pet_events` (`owner`,`week`);--> statement-breakpoint
CREATE TABLE `titles` (
	`owner` text NOT NULL,
	`title` text NOT NULL,
	`earned` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `title_unique` ON `titles` (`owner`,`title`);--> statement-breakpoint
ALTER TABLE `entries` ADD `font` text DEFAULT 'sans' NOT NULL;