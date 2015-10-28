var prompt = require('prompt');
var fs = require('fs-extra');
var url='/Users/jaimin/Desktop/CS454/Final_project/Sample Folders/'; 

console.log("WELCOME TO FILE MANAGER IN NODE");

//Start prompt for getting inputs
prompt.start();

init();

function init()
  {
    console.log("Press 1 to Copy files");//Copy file contents / Copy Folder Files
    console.log("Press 2 to Ensure File");//If there is a file, check..Not..Create one..
    console.log("Press 3 to Ensure Directory");//If there is a Directory, check..Not..Create one..
    console.log("Press 4 to Move File or Directory");//DIR to DIR
    console.log("Press 5 to rename file");
    console.log("Press 6 to make Directory")
    console.log("Press 7 to Remove file or Dir");
    console.log("Press 8 to Read JSON file");
    console.log("Press 9 to Write JSON file");//Just write the data
    console.log("Press 10 to Output JSON file");//If the file is not there, create one.


    //Getting Input From User for the operations
    prompt.get('inputChoice', function (err, result) 
    {
        if(result.inputChoice=='1')
          copyFiles();
        else if(result.inputChoice=='2')
          ensureFile();
        else if(result.inputChoice=='3')
          ensureDir();
        else if(result.inputChoice=='4')
          moveFile();
        else if(result.inputChoice=='5')
          renameFile();
        else if(result.inputChoice=='6')
          makeDir();
        else if(result.inputChoice=='7')
          removeFile();
        else if(result.inputChoice=='8')
          readJSON();
        else if(result.inputChoice=='9')
          writeJSON();
        else if(result.inputChoice=='10')
          outputJSON();
        else
          {
            console.log('Invalid Input for Choice');
            task();
          }
    });
  }

//1  
function copyFiles()
  {
    //User Input for Source and Destination File URL
    prompt.get(['fileSource', 'fileDestination'], function (err, result) 
    {   
        var temp = {
                    source:url+result.fileSource ,
                    destination:url+result.fileDestination,
                   };

        fs.copy(temp.source,temp.destination, function(err) 
        {
          if (err)
            {
              console.error("Invalid File Name or URL");
              task();  
            }  
          else
            { 
               console.log("SUCCESSFUL TRANSFER FROM "+temp.source+" TO "+temp.destination);
               task(); 
            }
        })
    });

  }
//2
function ensureFile()
  {
    //User Input URL for File
    prompt.get('ensureFileURL', function (err, result) 
    {   
        var temp = {
                    ensure:url+result.ensureFileURL,
                   };

        fs.ensureFile(temp.ensure, function(err) 
        {
               console.log("FILE IS AVAILABLE AT "+temp.ensure+"..!!");
               task(); 
        });
    });
  }   

//3
function ensureDir()
  {
    //User Input URL for DIRECTORY
    prompt.get('ensureDirURL', function (err, result) 
    {   
        var temp = {
                    ensure:url+result.ensureDirURL,
                   };

        fs.ensureDir(temp.ensure, function(err) 
        {
              console.log("DIRECTORY IS AVAILABLE AT "+temp.ensure+"..!!")
              task(); 
        });
    });
  }

//4
function moveFile()
  {
    //User Input for Source and Destination File URL
    prompt.get(['sourceFileURL','destFileURL'], function (err, result) 
    {   
        var temp = {
                    source:url+result.sourceFileURL ,
                    dest:url+result.destFileURL,
                   };

        fs.move(temp.source,temp.dest, function(err) 
        {
          if (err)
            {
              console.error("Invalid File Name or URL");
              task();  
            }  
          else
            { 
               console.log("SUCCESSFUL FILE TRANSFER FROM "+temp.source+" TO "+temp.destination);
               task(); 
            }
        })
    });

  }

//5
function renameFile()
{
prompt.get(['sourceFileURL','destFileURL'], function (err, result) 
    {   
        var temp = {
                    source:url+result.sourceFileURL ,
                    dest:result.destFileURL,
                   };
    fs.rename(temp.source, temp.dest, function (err)
      {
    if (err) 
    {
      console.log("Invalid File Name or URL");
      task();
    }
    else{
      console.log("renamed Complete..!!");
      task();
    }
      });
    });
}

//6
function makeDir()
  {
    //User Input URL for making Directory
    prompt.get('makeDir', function (err, result) 
    {   
        var temp = {
                    mkdirURL:url+result.makeDir ,
                   };

        fs.mkdirs(temp.mkdirURL, function(err) 
        {
          if (err)
            {
              console.error("Invalid File Name or URL");
              task();  
            }  
          else
            { 
               console.log("SUCCESSFUL DIR CREATED AT"+ temp.mkdirURL);
               task(); 
            }
        })
    });

  }

//7
function removeFile()
  {
    //User Input URL for File
    prompt.get('removeFile', function (err, result) 
    {   
        var temp = {
                    remove:url+result.removeFile,
                   };

        fs.remove(temp.remove, function(err) 
        {
               console.log("FILE REMOVED AT "+temp.remove+"..!!");
               task(); 
        });
    });
  }   

//8
function readJSON()
  {
    //User Input URL for File
    prompt.get('jsonFileURL', function (err, result) 
    {   
        var temp = {
                    json:url+result.jsonFileURL,
                   };

        fs.readJson(temp.json, function(err,packageObj) 
        {       
              if(err)
              {
                console.log("Invalid url....");
                task();
              }
                
              else
               {
               console.log(packageObj.version);
               task();  
               }
               });
    });
  } 

//9
function writeJSON()
  {
    //User Input URL for File
    prompt.get('jsonFileURL', function (err, result) 
    {   
        var temp = {
                    json:url+result.jsonFileURL,
                   };

        fs.writeJson(temp.json,{name: 'Hello World !!!'}, function(err) 
        {
               console.log("WRITE SUCCESSFUL");
               task(); 
        });
    });
  } 


  
//10
function outputJSON()
  {
    //User Input URL for making Directory
    prompt.get('jsonFileURL', function (err, result) 
    {   
        var temp = {
                    jsonURL:url+result.jsonFileURL ,
                   };

        fs.outputJson(temp.jsonURL,{name: 'Hello Jaimin',work:'Study'}, function(err) 
        {
          if (err)
            {
              console.error("Invalid File Name or URL");
              task();  
            } 
          else
          {
            console.log("Write SUCCESSFUL..!!"); 
            task();
          }
        })
    });

  }

function task()
  {
    //TO RESTART THE PROGRAM OR TO EXIT THE PROGRAM
    console.log('Want to perform more tasks??? Press \'R\' for New Task or Press \'E\' For Exit');
    prompt.get('RestartOrExit', function (err, result) 
    {
        if(result.RestartOrExit=='r' || result.RestartOrExit=='R')
          init();
        else if(result.RestartOrExit=='e' || result.RestartOrExit=='E')
          console.log('Thanks for Using File Manager');
        else
        {
          console.log('Invalid choice..');
          task();
        }
    });
  }