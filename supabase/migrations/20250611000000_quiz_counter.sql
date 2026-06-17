create table if not exists quiz_counter (
  id text primary key,
  count bigint not null default 0
);

insert into quiz_counter (id, count)
values ('total_completions', 0)
on conflict (id) do nothing;

create or replace function increment_quiz_counter()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  update quiz_counter
  set count = count + 1
  where id = 'total_completions'
  returning count into new_count;

  return new_count;
end;
$$;

grant select on quiz_counter to anon, authenticated;
grant execute on function increment_quiz_counter() to anon, authenticated;

alter table quiz_counter enable row level security;

create policy "Public read quiz counter"
  on quiz_counter
  for select
  to anon, authenticated
  using (true);
