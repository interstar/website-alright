Sites = new Meteor.Collection("sites");

if (Meteor.isClient) {

  Template.dashboard.sites = function() {
    return Sites.find({}, {});
  };

  Template.dashboard.events({
    'click input.refresh': function () {
       if (typeof console !== 'undefined') {
         Meteor.call("fetchSites",function() {
            console.log("Callback from fetchSites");
         });
       }
    }
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Sites.find().count() === 0) {
      // Add your servers here
      //Sites.insert({name:"ThoughtStorms",url:"http://thoughtstorms.info/view/welcome-visitors"});
      
    }
  });
  
  Meteor.methods({
    fetchSite: function(site) {        
        console.log("In fetchSite for " + site.name);
        try {
            var result = Meteor.http.get(site.url, {timeout:30000});
            if(result.statusCode==200) {
                Sites.update({"name":site.name}, {$set : {content : result.content, status:"OK"}});
            } else {
                Sites.update({"name":site.name}, {$set : {content : result.content, status :result.statusCode}});
            }
        } catch (err) {
            console.log("Error with " + site.name);
            Sites.update({"name":site.name}, {$set : {content : EJSON.stringify(err.response), status :err.response.statusCode}});
        }
    },

    fetchSites: function() {
        var theSites = Sites.find({});
        theSites.forEach(function(site) {
            Meteor.call("fetchSite",site);
        });
    }
    
  });
}
