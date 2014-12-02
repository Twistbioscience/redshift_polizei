# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 4) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "cache", force: true do |t|
    t.string   "hashid",     null: false
    t.json     "data",       null: false
    t.integer  "expires"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cache", ["hashid"], name: "index_cache_on_hashid", unique: true, using: :btree

  create_table "queries", force: true do |t|
    t.integer  "record_time", null: false
    t.string   "db",          null: false
    t.string   "user",        null: false
    t.integer  "pid",         null: false
    t.integer  "userid",      null: false
    t.integer  "xid",         null: false
    t.text     "query",       null: false
    t.string   "logfile",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",      null: false
    t.string   "google_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["google_id"], name: "index_users_on_google_id", unique: true, using: :btree

end