select
  trim(n.nspname) as schema_name,
  trim(c.relname) as table_name,
  n.oid as schema_id,
  c.oid as table_id,
  u2.usesysid as schema_owner_id,
  u2.usename as schema_owner_name,
  u.usesysid as table_owner_id,
  u.usename as table_owner_name
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
join pg_user u on c.relowner = u.usesysid
join pg_user u2 on n.nspowner = u2.usesysid
where trim(n.nspname) not in ('pg_catalog', 'pg_toast', 'information_schema')
