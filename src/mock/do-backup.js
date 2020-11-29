// Excecute only in STUDIO/ROBO 3T
const new_bd = "me-escolhe-prod";
db.academicexperiences.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["academicexperiences"].insert(d);
});
db.experiences.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["experiences"].insert(d);
});
db.labs.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["labs"].insert(d);
});
db.phases.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["phases"].insert(d);
});
db.projects.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["projects"].insert(d);
});
db.selections.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["selections"].insert(d);
});
db.students.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["students"].insert(d);
});
db.teachers.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["teachers"].insert(d);
});
db.workexperiences.find().forEach(function (d) {
  db.getSiblingDB(new_bd)["workexperiences"].insert(d);
});
