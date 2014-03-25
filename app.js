function getQuizData(){
  return Session.get("QuestionData");
}

Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'layout'
  });

  this.route('quiz', {
    path: '/quiz',
    template: 'quizwrapper',
    layoutTemplate:'layout',
    before: function(){ 
      if(Session.get("QuestionData"))return;
      
      Meteor.call('getRandomQuestion',function(err,data){
        //TODO actually handle all the errors...
        if(err){
          console.log(err);
        } else if(data){
          Session.set("QuestionData",data);
        } else {
          console.log("What the heck?");
        }
      });
    },
    action: function(){
      this.render();
      var q = Session.get('QuestionData');
      if(q){
        this.render(q.type,'quizrender');
      } else {
        this.render('loading','quizrender');
      }
    }
  });

  this.route('ttf', {
    path: '/asktruetruefalse',
    template:'infotruetruefalse',
    layoutTemplate: 'layout'
  });

  this.route('ttfquestion',{
    path: '/truetruefalse',
    template:'truetruefalse',
    layoutTemplate: 'layout',
    data: getQuizData
  });

  this.route('ttfanswer',{
    path: '/truetruefalseanswered',
    template: 'resulttruetrueffalse',
    layoutTemplate: 'layout'
  });
 
  this.route('webcam',{
    path: '/webcam',
    template: 'webcam'
  });
});

var mustBeSignedIn = function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.render('home');
      this.stop(); 
    }
  }

Router.before(mustBeSignedIn, {except: ['home']});

function mustBeSignedIn(){
  return !!Meteor.user();
}

Router.before(mustBeSignedIn, {except: ['home']});
