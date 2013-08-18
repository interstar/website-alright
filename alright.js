Sites = new Meteor.Collection("sites");

if (Meteor.isClient) {

  Template.dashboard.sites = function() {
    return Sites.find({}, {});
  };

  Template.dashboard.events({
    'click input.refresh': function () {
         Meteor.call("fetchSites",function() {
            console.log("Callback from fetchSites");
         });
    },
    
    'click input.addButton' : function () {
        var name = document.getElementById("newName").value;
        var url = document.getElementById("newUrl").value;
        console.log("name: " + name + "    url: " + url);
        Sites.insert({name:name,url:url});
        return false;
    },
    
    'click input.removeButton' : function () {
        console.log("AAAA");
        console.log(this);
        console.log(this.value);
        Sites.remove({"_id":this._id});
        return false;
        
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
