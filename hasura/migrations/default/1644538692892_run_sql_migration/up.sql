CREATE OR REPLACE FUNCTION public.trigger_cancel_bid()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.type = 'cancelled_bid' THEN
        UPDATE artworks SET bid_id = (SELECT transactions.id
        FROM transactions
        JOIN artworks ON transactions.artwork_id = artworks.id
        WHERE transactions.artwork_id = NEW.artwork_id
        AND transactions.type = 'bid'
        AND (transactions.created_at > artworks.transferred_at
        OR artworks.transferred_at IS NULL)
        ORDER BY amount DESC
        LIMIT 1
        ) where id = NEW.artwork_id;
    END IF;

  RETURN NEW;
END;
$function$;