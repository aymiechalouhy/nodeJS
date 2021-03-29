
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

var elements = ['quit', 'exit', 'hello', 'help', 'list', 'add', 'remove','check','uncheck'];
var Elts = [{ name: 'quit', done: true }, { name: 'exit', done: true }, { name: 'hello', done: true },
{ name: 'help', done: true }, { name: 'list', done: true }, { name: 'add', done: true }, { name: 'remove', done: true }];
var elements = ['quit', 'exit', 'hello', 'help', 'list', 'add', 'remove', 'check', 'uncheck'];
var fs = require('fs');
var data = fs.readFileSync('database.json', 'utf-8');
try {
  if (data == "") throw "Empty"
}
catch { data =' [{ "name": "coffe", "done": true }] '}
var Elts = JSON.parse(data);



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
  list(elements);
  list(Elts);
}
else if (text.trim().split(" ", 1) == 'add') {
  add(elements, text);
  add(Elts, text);
}
else if (text.trim().split(" ", 1) == 'remove') {
  remove(elements, text);
  remove(Elts, text);
}
else if (text.trim().split(" ", 1) == 'edit') {
  edit(elements, text);
  edit(Elts, text);
}
else if (text.trim() == 'list') {
  list(elements);
  list(Elts);
}
else if (text.trim().split(" ", 1) == 'check') {
  check(Elts, text);
}
else if (text.trim().split(" ", 1) == 'uncheck') {
  uncheck(Elts, text);
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
   '8- Check: marked the tasks you did in the list\n\n',
   '9- Unchek: shows you the tasks you have not Done\n\n',
  );
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  var fs = require('fs');
  var data = JSON.stringify(Elts);
  fs.writeFileSync('database.json', data);
  console.log('data saved successfully')
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
  function add(Elts, text) {
    var task = text.trim().split(" ").pop();
    if (text.trim().split(" ").length == 1) {
      console.log('"error" no tasks to add!')
    } else {
      elements = elements.push(task);
      Elts = Elts.push({ name: task, done: false });
      console.log(task + ' has been added to list successfully.')
    }
  }
}

function edit(elements, text) {
  function edit(Elts, text) {
    var tasks = text.trim().split(" ");
    if (tasks.length == 1) {
      console.log('"error" no task to edit!')
    } else if (tasks.length == 2) {
      elements[elements.length - 1] = tasks[1];
      console.log('the task ' + elements.length + ' change to ' + tasks[1])
      Elts[Elts.length - 1].name = tasks[1];
      console.log('the task ' + Elts.length + ' change to ' + tasks[1])
    } else {
      elements[tasks[1] - 1] = tasks[2];
      Elts[tasks[1] - 1].name = tasks[2];
      console.log('the task ' + tasks[1] + ' change to ' + tasks[2])
    }
  }
}

function remove(elements, text) {
  function remove(Elts, text) {
    var task = text.trim().split(" ").pop();
    if (text.trim().split(" ").length == 1) {
      elements.pop();
      console.log('task ' + elements.length + ' has been removed from list successfully.')
    } else if (task > elements.length) {
      Elts.pop();
      console.log('task ' + Elts.length + ' has been removed from list successfully.')
    } else if (task > Elts.length) {
      console.log('this task number is not exist! ')
    } else {
      elements.splice(task - 1, 1);
      Elts.splice(task - 1, 1);
      console.log('task ' + task + ' has been removed from list successfully.')
    }
  }
}

  function list(elements) {
    function list(Elts) {
      console.log('List of commands :')
      for (i = 1; i <= elements.length; i++) {
        console.log(i + '- ' + elements[i - 1] + '.')
      for (var i = 0; i < Elts.length; i++) {
        if (Elts[i].done) {
          console.log("[✓] " + Elts[i].name)
        }
        else {
          console.log("[ ] " + Elts[i].name)
        }
      }
    }
  }
}
function check(Elts, text) {
  var tasks = text.trim().split(" ");
  if (tasks.length == 1) {
    console.log("Error");
  }
  else if (tasks[1] > Elts.length) {
    console.log("Error");
  }
  else {
    Elts[tasks[1] - 1].done = true;
    console.log('checked successfully')
  }
}
function uncheck(Elts, text) {
  var tasks = text.trim().split(" ");
  if (tasks.length == 1) {
    console.log("Error");
  }
  else if (tasks[1] > Elts.length) {
    console.log("Error");
  }
  else {
    Elts[tasks[1] - 1].done = false;
    console.log('unchecked successfully')
  }
}


// The following line starts the application
startApp("Aymie Chalouhy")
