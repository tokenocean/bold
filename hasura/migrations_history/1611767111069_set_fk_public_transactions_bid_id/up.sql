alter table "public"."transactions"
           add constraint "transactions_bid_id_fkey"
           foreign key ("bid_id")
           references "public"."transactions"
           ("id") on update restrict on delete restrict;