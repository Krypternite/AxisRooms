Axis Chat
===================
------------
**TASK : TO MAKE AN OFFLINE CHAT APPLICATION BASED ON THE REQUIREMENTS**

This is make an offline chat application based on the given requirements. The application uses AngularJS.

----------


Documentation
-------------

**Left**

 - The users are listed on the left hand side of the application.
 - The left side-menu also contains to buttons to sort the users based
   on Name and Date.
 - Clicking the sort buttons once sorts the users in ascending order of
   the selected filter, clicking the same button again sorts the users
   in descending order.
 - There is also a search button at the top of the left side-menu that
   can be used to search the users.
 - Clicking on a particular user loads the chat box on the right hand
   side where his messages are listed.
   
   **Chat Box**
 - The incoming messages are list on the left hand side of the chat box and the outgoing messages are listed on the right hand side of the chat box.
 - At the bottom of the page, there is an input box to type new messages and there is also a send button next to it.
 - The send button remains disabled as long as nothing has been typed in the input box.
 - At the top of the page, there is a **toggle**, this is intended for use to emulate the incoming and outgoing messages. 
	 - When the toggle is to the right, all the new typed messages are treated as outgoing.
	 - When the toggle is to the left, all the new typed messages are treated as incoming.
 

> **Note:**
> 
> - There were some inconsistencies with **SAMPLE JSON** provided at http://demo4842709.mockable.io/users . Checked it with multiple online JSON Validators like [jsonlint.com](http://www.jsonlint.com) and https://jsonformatter.curiousconcept.com/.
> - So I hosted my own JSON at http://demo0168801.mockable.io/users.
>- The app when run for the first time fetches the list of JSON from  http://demo0168801.mockable.io/users using $http and processes the JSON and sets up the **LocalStorage**. 
>- Once the localStorage has been set up, reloading there message sent via the chat box are persisted using the localstorage and the not lost even upon reloading the page.


----------
## Demo ##
The demo the for the application is hosted at [AxisChat](https://krypternite.github.io/AxisRooms/).


----------


**Thanks.**
----
