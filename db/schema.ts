import { sqliteTable, text, integer, uniqueIndex, index } from 'drizzle-orm/sqlite-core';
export const entries = sqliteTable('entries', {
 id: text('id').primaryKey(), owner: text('owner').notNull(), day: text('day').notNull(), slot: integer('slot').notNull(),
 drawing: text('drawing'), stickers: text('stickers'), stickerLayout: text('sticker_layout'), font: text('font').notNull().default('sans'), body: text('body').notNull(), mood: text('mood').notNull(), region: text('region').notNull(), paper: text('paper').notNull(), sticker: text('sticker').notNull(),
 created: integer('created').notNull(), receiver: text('receiver'), receivedFor: text('received_for'), reaction: text('reaction'), flagged: integer('flagged').notNull().default(0),
}, t => [uniqueIndex('entries_daily_slot').on(t.owner,t.day,t.slot),uniqueIndex('entries_received_for').on(t.receivedFor),index('entries_receiver').on(t.receiver),index('entries_pool').on(t.flagged,t.receiver,t.created)]);
export const rewards = sqliteTable('rewards',{id:text('id').primaryKey(),owner:text('owner').notNull(),day:text('day').notNull(),kind:text('kind').notNull(),item:text('item').notNull(),consumedBy:text('consumed_by')},t=>[uniqueIndex('rewards_daily').on(t.owner,t.day,t.kind)]);
export const blocks = sqliteTable('blocks',{id:text('id').primaryKey(),owner:text('owner').notNull(),target:text('target').notNull()},t=>[uniqueIndex('blocks_pair').on(t.owner,t.target)]);
export const reports = sqliteTable('reports',{id:text('id').primaryKey(),owner:text('owner').notNull(),entry:text('entry').notNull(),reason:text('reason').notNull(),created:integer('created').notNull()},t=>[uniqueIndex('reports_entry').on(t.owner,t.entry)]);

export const sessions = sqliteTable('auth_sessions', {
 tokenHash: text('token_hash').primaryKey(), owner: text('owner').notNull(), expires: integer('expires').notNull(),
}, t => [index('auth_sessions_expiry').on(t.expires)]);
export const oauthStates = sqliteTable('oauth_states', {
 stateHash: text('state_hash').primaryKey(), browserHash: text('browser_hash').notNull(), verifier: text('verifier').notNull(), nonce: text('nonce').notNull(), expires: integer('expires').notNull(),
}, t => [index('oauth_states_expiry').on(t.expires)]);

export const petEvents=sqliteTable('pet_events',{id:text('id').notNull(),owner:text('owner').notNull(),week:text('week').notNull(),created:integer('created').notNull()},t=>[uniqueIndex('pet_event_unique').on(t.owner,t.id),index('pet_owner_week').on(t.owner,t.week)]);
export const titles=sqliteTable('titles',{owner:text('owner').notNull(),title:text('title').notNull(),earned:integer('earned').notNull()},t=>[uniqueIndex('title_unique').on(t.owner,t.title)]);
export const diaryTranslations=sqliteTable('diary_translations',{entry:text('entry').notNull(),target:text('target').notNull(),body:text('body').notNull()},t=>[uniqueIndex('translation_entry_target').on(t.entry,t.target)]);
export const translationUsage=sqliteTable('translation_usage',{key:text('key').primaryKey(),count:integer('count').notNull()});

export const profiles=sqliteTable('profiles',{owner:text('owner').primaryKey(),code:text('code').notNull(),nickname:text('nickname').notNull().default(''),icon:text('icon').notNull().default('🐈'),birthday:text('birthday').notNull().default('')},t=>[uniqueIndex('profile_code').on(t.code)]);
export const friendships=sqliteTable('friendships',{id:text('id').primaryKey(),a:text('a').notNull(),b:text('b').notNull(),requester:text('requester').notNull(),status:text('status').notNull(),created:integer('created').notNull()},t=>[uniqueIndex('friend_pair').on(t.a,t.b)]);
export const friendEntries=sqliteTable('friend_entries',{id:text('id').primaryKey(),friendship:text('friendship').notNull(),owner:text('owner').notNull(),target:text('target').notNull(),day:text('day').notNull(),body:text('body').notNull(),mood:text('mood').notNull(),region:text('region').notNull(),paper:text('paper').notNull(),sticker:text('sticker').notNull().default(''),stickers:text('stickers').notNull().default('[]'),drawing:text('drawing'),font:text('font').notNull().default('sans'),created:integer('created').notNull(),matched:text('matched'),readAt:integer('read_at'),cancelled:integer('cancelled').notNull().default(0)},t=>[uniqueIndex('friend_daily').on(t.owner,t.day),uniqueIndex('friend_match').on(t.matched),index('friend_inbox').on(t.target,t.matched)]);
export const friendMessages=sqliteTable('friend_messages',{id:text('id').primaryKey(),friendship:text('friendship').notNull(),owner:text('owner').notNull(),target:text('target').notNull(),clientId:text('client_id').notNull(),body:text('body').notNull(),created:integer('created').notNull(),readAt:integer('read_at')},t=>[uniqueIndex('dm_retry').on(t.owner,t.clientId),index('dm_thread').on(t.friendship,t.created,t.id),index('dm_sender').on(t.owner,t.created),index('dm_unread').on(t.target,t.friendship,t.readAt)]);
