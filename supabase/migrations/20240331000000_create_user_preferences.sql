-- Create user preferences table
create table if not exists public.user_preferences (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    theme text default 'light',
    notification_enabled boolean default true,
    daily_reminder_time time default '09:00',
    language text default 'ja',
    custom_settings jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.user_preferences enable row level security;

-- Create policies
create policy "Users can view their own preferences"
    on user_preferences for select
    using (auth.uid() = user_id);

create policy "Users can create their own preferences"
    on user_preferences for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own preferences"
    on user_preferences for update
    using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger update_user_preferences_updated_at
    before update on user_preferences
    for each row
    execute function update_updated_at_column();