ALTER TABLE `entries` ADD `stickers` text;--> statement-breakpoint
DROP TRIGGER consume_diary_sticker;
--> statement-breakpoint
CREATE TRIGGER consume_diary_sticker AFTER INSERT ON entries
WHEN NEW.stickers IS NULL AND NEW.sticker <> ''
BEGIN
 SELECT RAISE(ABORT,'STICKER_UNAVAILABLE') WHERE NOT EXISTS(SELECT 1 FROM rewards WHERE owner=NEW.owner AND item=NEW.sticker AND kind<>'bonus' AND consumed_by IS NULL);
 UPDATE rewards SET consumed_by=NEW.id WHERE id=(SELECT id FROM rewards WHERE owner=NEW.owner AND item=NEW.sticker AND kind<>'bonus' AND consumed_by IS NULL ORDER BY day,id LIMIT 1);
END;
--> statement-breakpoint
CREATE TRIGGER consume_diary_stickers AFTER INSERT ON entries
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
