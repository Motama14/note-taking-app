# Simple note taking app - NoteIt

This project is a web base note taking app where you can create and edit notes and add custom tags to them.

In this proyect I've used HTML, CSS and raw JS for the frontend part of the proyect and for the backend I've used Python with FastApi to connect the database (MySQL) with the Frontend using a REST API.

The main complexity of this project was making the notes have different sizes without having empty blanks between them and also resizing them for the same purpose when the window's size changes.

The rest of the project was really simple but the best practice for my very first Full Stack project, in the future I'd probably make a second version using a Frontend framework like Angular or React.

---

### Project Structure

#### Backend and database folders:
Contains the Python and SQL files for the backend part of the project, you will need an API key from api-ninjas and uncomment the /quote endpoint to have a quote on the top part of the app.

#### CSS folder:
Global single file for the CSS styling of the app.

#### JS folder:
Contains the Javascript files with all the features, [app.js](js/app.js) has all the functions related with the notes, [quotes.js](js/quotes.js) fetches the quotes from the quotes endpoint for the app and [time.js](js/time.js) has a simple function to update the time that shows in the aside part of the app.

--- 

#### What I learned:

Mainly how a more complex web based app works, how an user can interact with it and in the same way how it interacts with the database.

A good part where the complexity increases was how simple actions like closing the pop-up with the note selected or when you create a new note can also be part of the interactions between the user and the backend.
In this case when you close the pop-up this action calls 2 differente functions, depending if the note is new or not, in the main JS file that calls to 2 endpoints, one to update a selected note and another one to insert a new note.

---

#### Want to contribute?

As this project is really simple contributions won't be accepted but they will be accepted whenever this project gets more complex and has more features.