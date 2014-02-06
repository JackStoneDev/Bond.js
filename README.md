Bond
====

Bond.js is a demo and warning of what companies can track on the web. It records everything you do on a webpage, such as mouseclicks, keystrokes, and scrolls, and plays them back to you in exact order. You're essentially watching everything that you did. 

Why is this important, you ask? A social network could use a script like this to see exactly where their users go, exactly how long they spend on posts, etc. A hacker could embed a script like this in order to get all the information they could about a user: their usernames, passwords, and sensitive information would no longer be safe. 

We often falsely assume that we are safe if we disable cookies. This website is all JavaScript, and disabling JavaScript leads to a loss of functionality on most webpages. So go ahead, make yourself at home on this webpage. Everything you do will be recorded. Luckily, nothing you do on this page will be sent anywhere.

Under the Hood
==============

Bond.js captures DOM events as they occur, and inserts them into an array that contains the time of that event, the type of event, the target element, the target value (if applicable), the mouse coordinates at that time, and the scrollbar position at that time.  The array is then iterated over and timed actions are performed based on the time of each event, so everything fires exactly as it did for the user.
