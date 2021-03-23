// Script used to duplicate collections from one MongoDB database to another

// Uncomment the line below and put the origin database
// use me-escolhe-dev;

// Put here the destiny database
var new_bd = "me-escolhe-prod";

var collection_list = db.getCollectionNames();

print(`STARTING COPY COLLECTIONS FROM ${db.getName()} TO ${new_bd}`);

collection_list.forEach((collection) => {
  print(`STARTING COPY COLLECTION ${collection}`);

  db.getCollection(collection)
    .find()
    .forEach((document) => {
      db.getSiblingDB(new_bd)[collection].insert(document);
    });
});

print(`SUCCESSFUL COPY COLLECTIONS`);
