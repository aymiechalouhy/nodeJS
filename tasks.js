
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */


function onDataReceived(text) {
  text= text.replace('\n','').trim();
  var arrayText = text.split(' ');

  if (arrayText[0] === 'quit' || arrayText[0] === 'exit') {
    quit();
  }
  else if(arrayText[0] === 'hello'){
    hello();
  }
  else  if(arrayText[0] === 'help'){
    listOfCommands();
}
else  if(arrayText[0] === 'list'){
  list();

}
else  if(arrayText[0] === 'add'){
  add(elements, text);
}
else  if(arrayText[0] === 'remove'){
  remove(arrayText);
}
else  if(arrayText[0] === 'edit'){
  remove(elements,text);
}



  else{
    unknownCommand(text);
  }
}

 
/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */

function hello(){
  console.log('hello!')
}

function hello(text){
  if (text) {
    console.log("hello" + " " +text+ "!");
  }
    else{
      console.log("hello!");
    }
  }

/**
 * this function is made to print all the existing commands.
 * It works when you type help.
 *
 * @returns {void}
 */
function listOfCommands(){
  console.log('\n  Below are the possible commands: \n', '\n', 
   '1- help:Shows the available commands\n\n',
   '2- hello: Shows hello! message\n\n',
   '3- hello and type any name: Shows hello message and the name you have entered\n\n',
   '4- quit/exit: Quit the application\n\n',
   '5- list: shows you all the tasks\n\n',
   '6- add: permit you to add a new task\n\n',
   '7- remove: remove some tasks from the list\n\n',
  );
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
function exit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

var tasks = ['Testing the software' , 'Little steps' , 'String manipulation',
'Additional commands',' Refinements','Data modelling','Persistent data'];

function list() {
  for (var i = 0; i < tasks.length; i++) {
    console.log(i + 1 + " - " + tasks[i]);
  }
}

function add(elements, text) {
  var task = text.trim().split(" ").pop();
  if (text.trim().split(" ").length == 1) {
    console.log('"error" no tasks to add!')
  } else {
    elements = elements.push(task);
    console.log(task + ' has been added to list successfully')
  }
}

  /*function remove(arrayText){
    tasks.pop();
    tasks.shift();
    task.splice(text - 1, 1);
  }*/
     
  function remove(arrayText){
    if (arrayText[1] === undefined){
      tasks.pop();
    } else if (arrayText[1]-1 >tasks.length){
      console.log(" This task number does not exist!")
    }
    else {
      tasks.splice(arrayText[1]-1, 1)
    }
  }

  function edit(elements, text) {
    var tasks = text.trim().split(" ");
    if (tasks.length == 1) {
      console.log('"error" no task to edit!')
    } else if (tasks.length == 2) {
      elements[elements.length-1] = tasks[1];
      console.log('the task ' + elements.length + ' change to ' + tasks[1])
    } else {
      elements[tasks[1]-1] = tasks[2];
      console.log('the task ' + tasks[1] + ' change to ' + tasks[2])
    }
  }



// The following line starts the application
startApp("Aymie Chalouhy")
