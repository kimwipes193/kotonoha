import { sqliteTable, text, integer, uniqueIndex, index } from 'drizzle-orm/sqlite-core';
export const entries = sqliteTable('entries', {
 id: text('id').primaryKey(), owner: text('owner').notNull(), day: text('day').notNull(), slot: integer('slot').notNull(),
 body: text('body').notNull(), mood: text('mood').notNull(), region: text('region').notNull(), paper: text('paper').notNull(), sticker: text('sticker').notNull(),
 created: integer('created').notNull(), receiver: text('receiver'), receivedFor: text('received_for'), reaction: text('reaction'), flagged: integer('flagged').notNull().default(0),
}, t => [uniqueIndex('entries_daily_slot').on(t.owner,t.day,t.slot),uniqueIndex('entries_received_for').on(t.receivedFor),index('entries_receiver').on(t.receiver),index('entries_pool').on(t.flagged,t.receiver,t.created)]);
export const rewards = sqliteTable('rewards',{id:text('id').primaryKey(),owner:text('owner').notNull(),day:text('day').notNull(),kind:text('kind').notNull(),item:text('item').notNull()},t=>[uniqueIndex('rewards_daily').on(t.owner,t.day,t.kind)]);
export const blocks = sqliteTable('blocks',{id:text('id').primaryKey(),owner:text('owner').notNull(),target:text('target').notNull()},t=>[uniqueIndex('blocks_pair').on(t.owner,t.target)]);
export const reports = sqliteTable('reports',{id:text('id').primaryKey(),owner:text('owner').notNull(),entry:text('entry').notNull(),reason:text('reason').notNull(),created:integer('created').notNull()},t=>[uniqueIndex('reports_entry').on(t.owner,t.entry)]);
