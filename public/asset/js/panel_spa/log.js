
const KEY_STORAGE_LOG = "LOG_APPS";



/*

  Bentuk localStorage.[KEY_STORAGE_LOG] = [
  {
    message: ""
    type: "ERROR_CIT",
    context: context,
    file: error?.fileName || null,
    line: error?.lineNumber || null,
    column: error?.columnNumber || null,
    stack: error?.stack || null,
    time: new Date(),
    url: window.location.href,
    userAgent: navigator.userAgent
  },
  {
    message: ""
    type: "ERROR_CIT",
    context: context,
    file: error?.fileName || null,
    line: error?.lineNumber || null,
    column: error?.columnNumber || null,
    stack: error?.stack || null,
    time: new Date(),
    url: window.location.href,
    userAgent: navigator.userAgent
  },

  ]




*/



function logError(error, context = "", type = "GLOBAL") {
  var log = {
    message: error?.message || error,
    type: type,
    context: context,
    file: error?.fileName || null,
    line: error?.lineNumber || null,
    column: error?.columnNumber || null,
    stack: error?.stack || null,
    time: new Date(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  console.error("LOG INTERN:", log);
  saveDataLog(log);
}
function saveDataLog(log) {
  var db_log = JSON.parse(localStorage.getItem(KEY_STORAGE_LOG)) || [];
  db_log.push(log);
  localStorage.setItem(KEY_STORAGE_LOG, JSON.stringify(db_log));
}
function deleteAllDataLog(){
  localStorage.setItem(KEY_STORAGE_LOG, JSON.stringify([]));
}

// ++++++++++++ GET DATA LOG WITH FILTER +++++++++++++

//==== FILTERING SECTION ====

var FILTER_STATE = [

  {
    typeFilter : "time",
    start : "00:00",
    end : "00:00",
    filter : function( data ) {

      var result, msg_debug;

      var startTime = this.start;
      var endTime = this.end;

      if ( 

        ( startTime == "00:00" && endTime == "00:00"  ) 
        ||
        ( startTime.length < 1 && endTime.length < 1  ) 
        ) 
      {
        //Kondisi data result tidak di filter atau all
        msg_debug = "Data Tidak Terfilter Time";
        result = data;
      }else{
        //Kondisi data result sudah di filter
        msg_debug = "Data Terfilter Time";
        result = data.filter(log => {
          var logDate = new Date(log.time);

          var current = logDate.getHours() * 60 + logDate.getMinutes();

          var [startH, startM] = startTime.split(":").map(Number);
          var [endH, endM] = endTime.split(":").map(Number);

          var start = startH * 60 + startM;
          var end = endH * 60 + endM;

          return current >= start && current <= end;
        })
      }


      console.log( `
      ++++ FILTER TIME +++++ \n
      Start : ${ startTime }, \n
      End : ${ endTime } \n
      Result : 
      `, result);
      return result;

    }

  }, 
  {
    typeFilter : "logType",
    value : "",
    filter : function (data) {

      var result;
      var logType = this.value;


      if ( logType && logType.length > 0) {
        result = data.filter(log => log.type === logType);
      }else{
        result = data; // kalau kosong, jangan filter
      }

      console.log( `
        ++++ FILTER TYPE LOG +++++ \n
        Type Log : ${ logType }, \n
        Result : 
      `, result);
      return result;

    }
  },
  {
    typeFilter : "logFile",
    value : "",
    filter: function( data ){

      var result;
      var logFile = this.value;

      if (logFile && logFile.length > 0) {
        result = data.filter(log => log.file === logFile);
      } else {
        result = data; // kalau kosong, jangan filter
      }

      console.log(`
        ++++ FILTER FILE LOG +++++ \n
        File Log : ${logFile}, \n
        Result : 
      `, result);

      return result;

    }
  }

];



function get_filterState_byTypeFilter( typeFilter ){
  var 
  index_filterStateDB = 0, 
  row_filterStateDB = {};
  for (var i = 0; i < FILTER_STATE.length; i++) {
    row_filterStateDB = FILTER_STATE[i];
    index_filterStateDB = i;
    if ( typeFilter == row_filterStateDB.typeFilter  ) {
      break;
    }
  }

  /*
  row_filterStateDB = {
  typeFilter: "time",
  start: ""
  end : ""
  }
  */
  return {
    index_filterStateDB : index_filterStateDB,
    row_filterStateDB : row_filterStateDB
  }
}
function update_filterState( ROW_OPTION_FILTER_TARGET = {} ){

  var typeFilter = ROW_OPTION_FILTER_TARGET.typeFilter;
  var filterState_byTypeFilter = get_filterState_byTypeFilter( typeFilter );
 
  var index_filterStateDB = filterState_byTypeFilter.index_filterStateDB;
  var row_filterStateDB = filterState_byTypeFilter.row_filterStateDB;

  var row_filterStateMerge = { ...row_filterStateDB,  ...   ROW_OPTION_FILTER_TARGET }

  //Set Update Filter State By Index
  FILTER_STATE[index_filterStateDB] = row_filterStateMerge;
}


function get_dataLogAll() {
  return JSON.parse(localStorage.getItem(KEY_STORAGE_LOG)) || [];
}
function get_dataLogByFilter(){

  console.group("+++ get_dataLogByFilter ++++");

  //Data DB Source
  var data = get_dataLogAll();
  for (var i = 0; i < FILTER_STATE.length; i++) {
    var row_filterState = FILTER_STATE[i];//Object
    data = row_filterState.filter( data );
  }

  //Sorting Default DESC By Time
  data.sort((a, b) => new Date(b.time) - new Date(a.time));


  console.groupEnd();
  return data;

}
// ++++++++++++ END OF GET DATA LOG WITH FILTER +++++++++++++


function get_listFilter() {

  var data = get_dataLogAll();

  //Mengumpulkan type log dari sumber data terupdate pada session log
  var LIST_LOG_TYPE = [];
  var LIST_LOG_FILE = [];
  for (var i = 0; i < data.length; i++) {
    var row_data = data[i];

    var logType = row_data.type;
    LIST_LOG_TYPE.push( logType );

    var fileLog = row_data.file;
    LIST_LOG_FILE.push( fileLog );
  }


  //Distinct nilai yang sama
  var result = {

    logType : [...new Set(LIST_LOG_TYPE)],
    logFile : [...new Set(LIST_LOG_FILE)]

  }

  return result;
}







function generateDummyLogs() {

  var types = ["GLOBAL", "ERROR CIT"];
  var contexts = ["Auth", "Dashboard", "API", "Profile", "System"];
  var files = ["auth.js", "dashboard.js", "api.js", "profile.js", "system.js"];
  var messages = [
    "Login success",
    "Undefined variable",
    "Null pointer",
    "API fetched",
    "Something went wrong",
    "Token expired"
  ];

  for (var i = 0; i < 50; i++) {

    var hour = String(Math.floor(Math.random() * 24)).padStart(2, "0");
    var min = String(Math.floor(Math.random() * 60)).padStart(2, "0");

    var log = {
      message: messages[Math.floor(Math.random() * messages.length)],
      type: types[Math.floor(Math.random() * types.length)],
      context: contexts[Math.floor(Math.random() * contexts.length)],
      file: files[Math.floor(Math.random() * files.length)],
      line: Math.floor(Math.random() * 100),
      column: Math.floor(Math.random() * 10),
      stack: null,
      time: new Date(`2026-04-13T${hour}:${min}:00`),
      url: "http://localhost/app",
      userAgent: "Chrome"
    };

    saveDataLog(log);
  }

  console.log("🔥 Dummy logs generated!");
}

// ============ Catch ALL Log Error ================
window.onerror = function(msg, src, line, col, err) {
  logError({
    message: msg,
    fileName: src,
    lineNumber: line,
    columnNumber: col,
    stack: err?.stack
  }, 
  "GLOBAL", 
  "ERROR_GLOBAL");
};







