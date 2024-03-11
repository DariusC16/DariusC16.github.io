
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); // Clear the body

  const $tweetsDiv = $('<div id=tweets>'); //Div tag holding the the unorded list of div tags inside
  $body.append($tweetsDiv);


  const $tweets = streams.home.map((tweet) => { // For every element in the array a div tag is created and message is put inside of it 

    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message}`;

    // Creating div tag
     const $clockDate = $('<div></div>').attr('id', 'date');
     // Placing tweet date inside the div tag for $clockDate
      $clockDate.append(`${tweet.created_at}`);

    $tweet.text(text);// Putting the message inside the div tag
    $tweet.append($clockDate); // Time is placed underneath the tweet

    return $tweet;
  }); // => Returning an array of messages created from each object

  $tweetsDiv.append($tweets); // Puts the all the code inside the the starting div tag

  // CODE BELOW IS CODE BEING ADDED AND WORKED ON
  // Creating anchor tag
   //const $anchor = $('<a></a>').attr('href', 'man');

   // Placing username inside of anchor tag
  //  $anchor.insertBefore($tweetsDiv)
  
 
// Creating button tag
   $but1 = $('<button></button>').attr('id', 'newMessage');
   // Name to call button
   $but1.text('Tweeting')
   // Should put the button before the tag holding all the tweets
   $but1.insertBefore($tweetsDiv)
   // Function to make the button work
  $('#newMessage').click(function(){
    // Clearing body of old tweets from inside tweetsDiv tag
     $tweetsDiv.html('');

     // Creating newTweet array
      const $newArray = [];
      // Using for loop
       for (let i = 0; i < streams.home.length; i++) {
        if (i > 10) {
        $newArray.push(streams.home[i]);
        console.log($newArray) // => Successfully pushes tweets that weren't shown past 10th index
        }
       }

       // Now using map on $newArray
        const $new = $newArray.map(function(object) {
          // Now looping through the array
           // Creating div tag
            const $div = $('<div></div>');

            // Creating text
             const $newtext = `@${object.user}: ${object.message}`;

             // Creating timeStamp tag in case we must place it underneathe the tweet
              const $timeStamp = $('<div></div>').attr('id', 'time');
              $timeStamp.append(`${object.created_at}`)
              
              // Creating anchor tag
               // Assinging object user a variable                                                // Text goes inside the tag
                const $anchor = $('<a></a>').attr('class', 'user-link').attr('href', 'shawndrost.html').append(object.user)
                
                // Creating click event for anchor tag
                 $anchor.click(function(event) {
                  // Preventing the default link behavior to head towards a new page
                  event.preventDefault();
                              // tweetsDiv tag is cleared out
                               $tweetsDiv.html('');

                               // Retrieve the username from the anchor tag
                                const username = $(this).text();

                                // Using filter method for streams home
                                 const $specificUser = streams.home.filter((tweet) => tweet.user === username);

                                 // Using map method to create messages out of the filtered array
                                  const $specificMessage = $specificUser.map((tweet) => {
                                  // Now looping array
                                   // Creating div tag
                                    const $anchorDiv = $('<div></div>');
          
                                    // Using moment.js
                                     const $moment = moment(tweet.created_at);
                                     // Using full moment syntax
                                      const $relativeTime = $moment.startOf('hour').fromNow();
            
                                      // Creating message
                                       const $anchorMessage = `@${tweet.user}: ${tweet.message}. -`;

          

                                       // Appending message to the div tag
                                        $anchorDiv.append($anchorMessage);
                                        $anchorDiv.append($relativeTime);

                                        // Returning the div tag
                                         return $anchorDiv;
                                        }); // => WHERE MAP FUNCTION ENDS

                                         // Appending the specific message to the main Tweets div tag
                                          $tweetsDiv.append($specificMessage);
                                         }) // => WHERE ANCHOR CLICK EVENT ENDS
                 
                                          // Appending newtext to div tag to place inside
                                           $div.append($newtext).append($timeStamp).append($anchor);
                                           return $div;
                                          })
                                           // Appending div tag to pop out new tweets
                                            $tweetsDiv.append($new);
                                          });
                                          
                                          // CREATING A WAY FOR THE USER TO TWEET
                                           // Creating form tag
                                            const $form = $('<form>').attr('class', 'tweetsForm');

                                            // Creating button tag to click on
                                             const $submit = $('<button></button>').attr('type', 'submit').attr('id', 'newMessage').append('Send');

                                             // Creating paragraph tag
                                              const $para = $('<p>')
                                              const $para2 = $('<p>')

                                              // Inside form tag
                                               // Creating label tags
                                                const $label = $('<label>').attr('for', 'name').append('Name');
                                                const $label2 =  $('<label>').attr('for', 'name').append('Tweet');

                                                // Creating input tag
                                                 const $input = $('<input>').attr('type', 'text').attr('id', 'name');
                                                 const $input2 = $('<input>').attr('type', 'text').attr('id', 'tweet');

                                                 // Adding content to paragraph tag
                                                  $para.append($label);
                                                  $para.append($input);

                                                  $para2.append($label2);
                                                  $para2.append($input2);

                                                  // Appening paragraph and button tags to form tag
                                                   $form.append($para);
                                                   $form.append($para2);
                                                   $form.append($submit);

                                                   // Putting form tag before the button
                                                    $form.insertBefore($but1);

                                                    // Creating submission event 
                                                     $form.submit(function (event) {
                                                      // Using event.preventDefault method
                                                       event.preventDefault();

                                                       // Accessing id values from the form inputs
                                                        const $userName = $('#name').val()
                                                        const $tweetMessage = $('#tweet').val();

                                                        // Making a new object for viewer
                                                         const $newTweet = {
                                                          user: $userName,
                                                          message: $tweetMessage,
                                                          created_at: new Date(),
                                                        }
                                                        
                                                        // Adding a new property into the users object and assigning it the name or empty array
                                                         streams.users[$userName] = streams.users[$userName] || [];

                                                         // Pushing the newTweet object into streams user, $userName proeprty
                                                          streams.users[$userName].push($newTweet); // => Now the array has an object
                 
                                                          // Pushing the newTweet object into streams home array
                                                           streams.home.push($newTweet); // => Home property has a new object

                                                           // After all is done clear the inputs
                                                            // Using val method with qutotation marks inside
                                                             $('#name').val('');
                                                             $('#tweet').val('');
                                                             
                                                             // Now clearing the html body
                                                              $tweetsDiv.html('');

                                                              // Using map method on streams home
                                                               const $pageViewer = streams.home.map(object => {
                                                                // Now looping through array of objects
                                                                 // For every element in the object

                                                                  // Creating div tag
                                                                   const $viewerTweet = $('<div></div>');

                                                                   // Creating message to make the tweet
                                                                    const $viewerText = `@${object.user}: ${object.message}`;
                            
                                                                    // Creating div tag for time 
                                                                     const $viewerClockDate = $('<div></div>').attr('id', 'date');
                         
                                                                     // Placing tweet date inside the div tag for $viewerClockDate
                                                                      $viewerClockDate.append(`${object.created_at}`);
                    
                                                                      $viewerTweet.text($viewerText);// Putting the message inside the div tag
                                                                      $viewerTweet.append($viewerClockDate); // Time is placed underneath the tweet
                              
                                                                      // Returning div tag with all the contents
                                                                       return $viewerTweet;
                                                                      })
                                                                      // Adding the website viewers tweets to the main div tag holding the tweets
                                                                       $tweetsDiv.append($pageViewer);
                                                                      })  

                                                                      // Creating header tag
                                                                       const $header = $('<h1></h1>').append('Welcome To Beta');
                                                                       $header.insertBefore($form);
                                                                       
                                                                    });
