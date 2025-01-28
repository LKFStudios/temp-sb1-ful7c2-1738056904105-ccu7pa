-- Create referrals table
create table if not exists public.referrals (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) not null,
    referral_id text not null unique,
    referred_user_id uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    used_at timestamp with time zone,
    constraint referral_id_format check (referral_id ~ '^[A-Z0-9]{8}$')
);

-- Enable RLS
alter table public.referrals enable row level security;

-- Create policies
create policy "Users can view their own referrals"
    on referrals for select
    using (auth.uid() = user_id);

create policy "Users can create referrals"
    on referrals for insert
    with check (auth.uid() = user_id);

create policy "Users can update their referrals"
    on referrals for update
    using (auth.uid() = user_id);

-- Create indexes
create index referrals_user_id_idx on referrals(user_id);
create index referrals_referral_id_idx on referrals(referral_id);
create index referrals_referred_user_id_idx on referrals(referred_user_id);

-- Create function to check referral limits
create or replace function check_referral_limit()
returns trigger as $$
begin
  if (select count(*) from referrals where user_id = new.user_id) >= 10 then
    raise exception 'Maximum number of referral codes reached';
  end if;
  return new;
end;
$$ language plpgsql;

-- Create trigger for referral limit
create trigger enforce_referral_limit
  before insert on referrals
  for each row
  execute function check_referral_limit();