ALTER TABLE rewards ADD COLUMN consumed_by text;
--> statement-breakpoint
CREATE TRIGGER consume_diary_sticker
AFTER INSERT ON entries
WHEN NEW.sticker <> ''
BEGIN
  SELECT RAISE(ABORT, 'STICKER_UNAVAILABLE') WHERE NOT EXISTS (
    SELECT 1 FROM rewards WHERE owner=NEW.owner AND item=NEW.sticker
      AND kind<>'bonus' AND consumed_by IS NULL
  );
  UPDATE rewards SET consumed_by=NEW.id WHERE id=(
    SELECT id FROM rewards WHERE owner=NEW.owner AND item=NEW.sticker
      AND kind<>'bonus' AND consumed_by IS NULL ORDER BY day,id LIMIT 1
  );
END;
