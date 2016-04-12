<h1>Coder Confessions</h1>
Coder Confessions is a loose online community where coders can safely visit to anonymously share their most fun or their most dastardly secrets. People can elect to enter an alias to track their confessions or also submit their email address so that they can receive their confessions via email in a year. Coder Confessions is also a place where people can come to read other people's confessions, whether for fun or as a sanity check to gain perspective in understanding that their obstacles are not unique.

When a visitor returns and enters in the same alias and email address, their submission will append to their original confession.

Link to project hosted on Heroku: https://stark-shore-10560.herokuapp.com/<br>
Link to project hosted on Heroku as admin: https://stark-shore-10560.herokuapp.com/admin

Visitors can only post to the website, however there is an admin endpoint where the admin can edit and delete submissions.

<h2>Technologies Used</h2>
- JavaScript
- jQuery
- Node.js
- Express
- Mongoose
- Body-parser
- HTML
- CSS
- Bootstrap
- Handlebars
- Favicon
- Font Awesome

<h2>Planned Features</h2>
- Fix update AJAX call so that not all submissions are changed to the same edit.
- Change POST route so that if user omits an alias, a randomly generated alias is generated for them
- Fix handlebars display for aliases with multiple confessions, list instead of current paragraph style.
- Set confession character limit to 140 characters.
- Add timestamp to submissions.
- Add trending div which tracks most popular topics via hashtags
