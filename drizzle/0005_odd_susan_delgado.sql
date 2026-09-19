CREATE TABLE `diary_translations` (
	`entry` text NOT NULL,
	`target` text NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translation_entry_target` ON `diary_translations` (`entry`,`target`);--> statement-breakpoint
CREATE TABLE `translation_usage` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
