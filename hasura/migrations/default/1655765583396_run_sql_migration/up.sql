CREATE OR REPLACE FUNCTION public.trigger_set_transferred_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.owner_id <> OLD.owner_id THEN
    NEW.list_price = null;
    NEW.list_price_tx = null;
    NEW.auction_start = null;
    NEW.auction_end = null;
    NEW.max_extensions = null;
    NEW.extension_interval = null;
    NEW.reserve_price = null;
    NEW.bid_id = null;
    NEW.transferred_at = NOW();
    
    UPDATE royalty_recipients SET amount = 5 WHERE address = (SELECT address FROM default_royalty_recipients) AND id = NEW.id;
    RAISE NOTICE 'id is currently %', NEW.id;
  END IF;
  RETURN NEW;
END;
$function$;
