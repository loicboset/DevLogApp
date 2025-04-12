create table "public"."mood_checks" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "score" smallint,
    "user_id" uuid not null default gen_random_uuid()
);


create table "public"."user_settings" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid not null,
    "role" character varying,
    "experience" smallint,
    "goal" character varying,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "mood_checks_enabled" boolean default true
);


alter table "public"."journal_entries" alter column "date" set data type date using "date"::date;

CREATE UNIQUE INDEX mood_checks_id_key ON public.mood_checks USING btree (id);

CREATE UNIQUE INDEX mood_checks_pkey ON public.mood_checks USING btree (id);

CREATE UNIQUE INDEX user_settings_pkey ON public.user_settings USING btree (id);

CREATE UNIQUE INDEX user_settings_user_id_key ON public.user_settings USING btree (user_id);

alter table "public"."mood_checks" add constraint "mood_checks_pkey" PRIMARY KEY using index "mood_checks_pkey";

alter table "public"."user_settings" add constraint "user_settings_pkey" PRIMARY KEY using index "user_settings_pkey";

alter table "public"."mood_checks" add constraint "mood_checks_id_key" UNIQUE using index "mood_checks_id_key";

alter table "public"."mood_checks" add constraint "mood_checks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."mood_checks" validate constraint "mood_checks_user_id_fkey";

alter table "public"."user_settings" add constraint "user_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_settings" validate constraint "user_settings_user_id_fkey";

alter table "public"."user_settings" add constraint "user_settings_user_id_key" UNIQUE using index "user_settings_user_id_key";

grant delete on table "public"."mood_checks" to "anon";

grant insert on table "public"."mood_checks" to "anon";

grant references on table "public"."mood_checks" to "anon";

grant select on table "public"."mood_checks" to "anon";

grant trigger on table "public"."mood_checks" to "anon";

grant truncate on table "public"."mood_checks" to "anon";

grant update on table "public"."mood_checks" to "anon";

grant delete on table "public"."mood_checks" to "authenticated";

grant insert on table "public"."mood_checks" to "authenticated";

grant references on table "public"."mood_checks" to "authenticated";

grant select on table "public"."mood_checks" to "authenticated";

grant trigger on table "public"."mood_checks" to "authenticated";

grant truncate on table "public"."mood_checks" to "authenticated";

grant update on table "public"."mood_checks" to "authenticated";

grant delete on table "public"."mood_checks" to "service_role";

grant insert on table "public"."mood_checks" to "service_role";

grant references on table "public"."mood_checks" to "service_role";

grant select on table "public"."mood_checks" to "service_role";

grant trigger on table "public"."mood_checks" to "service_role";

grant truncate on table "public"."mood_checks" to "service_role";

grant update on table "public"."mood_checks" to "service_role";

grant delete on table "public"."user_settings" to "anon";

grant insert on table "public"."user_settings" to "anon";

grant references on table "public"."user_settings" to "anon";

grant select on table "public"."user_settings" to "anon";

grant trigger on table "public"."user_settings" to "anon";

grant truncate on table "public"."user_settings" to "anon";

grant update on table "public"."user_settings" to "anon";

grant delete on table "public"."user_settings" to "authenticated";

grant insert on table "public"."user_settings" to "authenticated";

grant references on table "public"."user_settings" to "authenticated";

grant select on table "public"."user_settings" to "authenticated";

grant trigger on table "public"."user_settings" to "authenticated";

grant truncate on table "public"."user_settings" to "authenticated";

grant update on table "public"."user_settings" to "authenticated";

grant delete on table "public"."user_settings" to "service_role";

grant insert on table "public"."user_settings" to "service_role";

grant references on table "public"."user_settings" to "service_role";

grant select on table "public"."user_settings" to "service_role";

grant trigger on table "public"."user_settings" to "service_role";

grant truncate on table "public"."user_settings" to "service_role";

grant update on table "public"."user_settings" to "service_role";


