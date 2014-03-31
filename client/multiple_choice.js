
Template.question_mc.events = {
  'click button#next' : function (event,template) {
    //post to db
    //save user, true statement, true statment, false statement, num
    var true1 = template.find('#truth1'),
        true2 = template.find('#truth2'),
        false1 = template.find('#lie'),
        num = 1;

    if(!true1.value){
      $(true1).parent().addClass('has-error').one('keydown',function (event) {
        $(this).removeClass('has-error');
      });
    }

    if(!true2.value){
      $(true2).parent().addClass('has-error').one('keydown',function (event) {
        $(this).removeClass('has-error');
      });
    }

    if(!false1.value){
      $(false1).parent().addClass('has-error').one('keydown',function (event) {
        $(this).removeClass('has-error');
      });
    }

    if(true1.value && true2.value && false1.value){
      Meteor.saveQuestion('truetruefalse',{
        true1:true1.value,
        true2:true2.value,
        false1:false1.value,
      });
      Router.go('nextprequiz');

    } else {
      console.log("Enter values!");
    }
  }
}

Template.response_mc.events = {
  'click button#next' : function(event){
    //this is the quizobj because of the #with
    Meteor.saveResponse(this.right,this);
    Session.set("QuestionData");
  }
};

