// Runs once, automatically, the first time the mongo container starts with
// an empty /data/db (docker-entrypoint-initdb.d convention). Creates an
// app-scoped user with readWrite on just the app DB, so the Next.js app
// never holds the root Mongo credentials.
const appDb = process.env.MONGO_INITDB_DATABASE || "fablabs";

db = db.getSiblingDB(appDb);

db.createUser({
  user: process.env.MONGO_APP_USERNAME,
  pwd: process.env.MONGO_APP_PASSWORD,
  roles: [{ role: "readWrite", db: appDb }],
});
