-- Create user profiles table
create table if not exists public.user_profiles (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    gender text check (gender in ('male', 'female', 'unspecified')) not null,
    birth_date date,
    auth_provider text check (auth_provider in ('email', 'apple', 'google')) not null,
    email text,
    display_name text,
    avatar_url text,
    metadata jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
    on user_profiles for select
    using (auth.uid() = user_id);

create policy "Users can update their own profile"
    on user_profiles for update
    using (auth.uid() = user_id);

-- Create updated_at trigger
create trigger update_user_profiles_updated_at
    before update on user_profiles
    for each row
    execute function update_updated_at_column();

-- Create indexes
create index user_profiles_user_id_idx on user_profiles(user_id);
create index user_profiles_email_idx on user_profiles(email);