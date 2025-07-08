-- This is an empty migration.
-- Create the notify trigger function
-- Create the trigger function to notify on insert
CREATE OR REPLACE FUNCTION notify_voice_message_insert()
RETURNS TRIGGER AS $$
DECLARE
  payload JSON;
BEGIN
  payload := row_to_json(NEW);
  PERFORM pg_notify('voice_message_channel', payload::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the "VoiceMessage" table (case-sensitive)
CREATE TRIGGER voice_message_insert_trigger
AFTER INSERT ON "VoiceMessage"
FOR EACH ROW
EXECUTE FUNCTION notify_voice_message_insert();