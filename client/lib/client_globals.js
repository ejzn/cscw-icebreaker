QuestionCount = new Meteor.Collection('QuestionCount');
AnswerCount = new Meteor.Collection('AnswerCount');

Meteor.saveQuestion = function(type,dataobj){
  dataobj.userid = Meteor.userId();
  dataobj.type = type;
  dataobj.rand = Math.random();
  Questions.insert(dataobj);
}

Meteor.saveResponse = function(correct,dataobj){
  //adding this to meteor to make it accessible from anywhere on client...
  Answers.insert({
    correct:String(correct),
    dataobj:dataobj,
    userid_question:dataobj.userid,
    userid_answer:Meteor.userId(),
    type:dataobj.type
  });
}

//setup helpers for handlebars before the data
// is actualy set.
Handlebars.registerHelper('QData', function() {
  return Session.get("QuestionData");
});