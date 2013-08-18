Website? Alright!
=================
I wanted a simple dashboard that checks on the status of a number of web-servers. 

I also wanted to try a simple Meteor.js experiment.

This is the result.

QuickStart
----------

Make sure you have meteor installed. Follow the [instructions](http://docs.meteor.com/#quickstart).

Then it gets slightly tricky because you'll want to use Meteor and NOT git cloning to make your work environment.

    meteor create alright
    
Now we'll go into it, get rid of meteor's default files and pull mine from github.

    cd alright
    rm *
    git init
    git pull https://github.com/interstar/website-alright.git
    
Now you have to include the libraries you'll need in meteor

    meteor add http

And then you can start it

    meteor
    
And in the browser, visit localhost:3000
    
There's no data in the database yet, so it's a pretty boring screen.

Open up the browser's terminal on that page. And type 

    Sites.insert({name:"ThoughtStorms",url:"http://thoughtstorms.info/view/welcome-visitors"});
    
That's my wiki, one of the sites I'm monitoring. You'll obviously choose your own. 

Look at the page again. It should have now updated to add that URL to the list. Hit the "refresh" button to get the status.
    
    
    


