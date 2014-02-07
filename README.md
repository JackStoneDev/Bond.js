# Bond.js

## [Live Demo](http://jackstonedev.com/portfolio/bond/ "Bond")

Bond.js is a demo showing how much information companies can track on the web, and also serves as a warning to all internet users. It records everything you do on a web page, such as mouseclicks, keystrokes, and scrolls, and plays them back to you in exact order. You're essentially watching every move you made. 

Why is this important, you ask? A social network could use a script like this to see exactly where their users go, how long they spend on various posts, etc. Hackers could embed a script like this to get all the information they could about an individual. Usernames, passwords, and sensitive information would no longer be safe. 

We often falsely assume that we are protected if we disable cookies. This website is all JavaScript, which many web sites rely on for core functionality.

This is not intended to be used for commercial purposes. Instead, Bond.js demonstrates how much information companies can get about you on the web.	

## Features:

- User actions are played back exactly as they occurred.
- Fully-functional Flickr search implementation for demo's sake.
- All actions are processed into a single array, so your information can be easily sold.
- No Flash or cookie dependency.

## Under the Hood

Bond.js captures DOM events as they occur, and inserts them into an array that contains the time of that event, the type of event, the target element, the target value (if applicable), the mouse coordinates at that time, and the scrollbar position at that time.  The array is then iterated over and timed actions are performed based on the time of each event, so everything fires exactly as it did for the user.  A div that looks like a mouse pointer is animated just as the user originally moved it, and the page is scrolled based on where the user was.

## License

Bond.js is licensed under an MIT license.

Copyright (c) 2014 Jack Stone.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
