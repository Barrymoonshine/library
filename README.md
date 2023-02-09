# library
Library project from the Odin Project 

- Objects can't be printed onto a page using DOM methods, print a string onto the page instead,investigate info method 
- Investigate re-rendering, and why displayLibrary() is re-rendering the myLibrary array
- after submit is pressed close modal
- Check box on, change on to have read 


Learnings 
- default button type in a form is submit
- Objects can't be added to the page using DOM methods 
- Data attributes
- HaveRead status not staying when updated and new cards added 

Bugs to fix 

- haveRead 
- input with empty fields 
- go back to submit button to get field validation?

Firstly thanks so much for looking at my code and the pointer on this, I think I've fixed this but not entirely sure why it's worked!
I've updated the my createLibraryCard function to use the myLibrary object to populate the card rather than the .info object method. My theory is this has worked as the myLibrary object has the edited book read status, whereas the .info method was returning the original status provided by the user (as an array). Sorry one more question, but if my theory is right - do you know why this is the case? As I'm confused why my object method was storing the originally provided read status as I dont think I am storing this in a variable? 
Maybe I'm not understanding how the 'this' keyword works?
