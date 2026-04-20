

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

const KEY_STORAGE_LOG = "LOG_APPS";
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

  console.warn( KEY_STORAGE_LOG, log);
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
  }, 
  updateFilter : function( row_filterStateUpdate = {} ) {
    this.start = row_filterStateUpdate.start;
    this.end = row_filterStateUpdate.end;
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
  },
  updateFilter : function( row_filterStateUpdate = {} ) {
    this.value = row_filterStateUpdate.value;
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

  },
  updateFilter : function( row_filterStateUpdate = {} ) {
    this.value = row_filterStateUpdate.value;
  }
}

];

function get_dataLogAll() {
  return JSON.parse(localStorage.getItem(KEY_STORAGE_LOG)) || [];
}
function get_dataLogByFilter( callback_filterStateUpdate = false ) {

  //Update Filter State With Argument Callback
  if (  callback_filterStateUpdate == false ) {
    callback_filterStateUpdate = function() {
      return 1;
    }
  }
  callback_filterStateUpdate();

  var data_result = get_dataLogAll();

  //Filtering data
  for (var i = 0; i < FILTER_STATE.length; i++) {
    var row_filterState = FILTER_STATE[i];
    data_result = row_filterState.filter( data_result  );
  }

  return data_result;
} 

//Filter State Update
function get_filterStateByFilterType( typeFilter_input = false ) {
  //Mengembalikan object row filter state berdasarkan typFilter dan akan ditambahkan index filter state nya agar bisa melakukan update nantinya
  var row_filterState = {};
  for (var i = 0; i < FILTER_STATE.length; i++) {
    row_filterState = FILTER_STATE[i];
    if ( typeFilter_input == row_filterState.typeFilter ) {
      //Menambahkan property indexUpdate dari row FILTER STATE
      row_filterState.indexUpdate = i;
      break;
    }
  } 

  /*  
  Contoh Pengembalian 
  {
    typeFilter : "namaFilter",
    value : "",
    indexUpdate : 0,
    filter : function (data) {
        ......
    }, 
    updateFilter : function( row_filterState ){
      .........
    }

  }
  */
  console.log(`
    ++++ get_filterStateByFilterType with ${typeFilter_input} 
   +++++++ `, row_filterState);
  return row_filterState;
}
function update_filterStateByFilterType( typeFilter_input, row_filterStateUpdate = {} ) {
  var filterStateByFilteType = get_filterStateByFilterType( typeFilter_input );
  var indexUpdate = filterStateByFilteType.indexUpdate;

  //Lakukan update filter dengan method filter dari masing masing filter state berdasarkan indexUpdate 
  FILTER_STATE[indexUpdate].updateFilter( row_filterStateUpdate );
}


// ++++++++++++ END OF GET DATA LOG WITH FILTER +++++++++++++

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







