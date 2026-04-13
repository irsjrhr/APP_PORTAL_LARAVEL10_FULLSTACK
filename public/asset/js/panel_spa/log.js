
const KEY_STORAGE_LOG = "LOG_INTERN";


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
  var logs = JSON.parse(localStorage.getItem(KEY_STORAGE_LOG)) || [];
  logs.push(log);
  localStorage.setItem(KEY_STORAGE_LOG, JSON.stringify(logs));
}
function deleteAllDataLog(){
  localStorage.setItem(KEY_STORAGE_LOG, JSON.stringify([]));
}


// ++++++++++++ GET DATA LOG WITH FILTER +++++++++++++



//==== FILTERING SECTION ====

var OPTION_FILTER = [

  {
    type : "time",
    start : "00:00",
    end : "00:00"
  },
  {
    type : "typeLog",
    value : "ERROR CIT",
  }

];
function filter_time(data, startTime, endTime) {

  var result, msg_debug;


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

  console.log("+++++++++ " + msg_debug);
  return result;

}
function filter_typeLog(data, typeLog) {

  if (!typeLog || typeLog.length < 1) {
    return data; // kalau kosong, jangan difilter
  }

  var result = data.filter(function(log) {
    return log.type === typeLog;
  });

  return result;
}
function FILTER_DATA_INIT( data, row_option_filter = {} ){
  var type_filter = row_option_filter.type;
  switch (type_filter) {

  //Object Filter Time
  case "time":
    data = filter_time( data, row_option_filter.start, row_option_filter.end );
    break;

  //Object Filter Type Log
  case "typeLog":
    data = filter_typeLog( data, row_option_filter.value );
    break;
  }

  return data;
}
//==== END OF FILTERING SECTION ====
function getDataLog( OPTION_FILTER = [] ){

  //Data DB Source
  var data = JSON.parse(localStorage.getItem(KEY_STORAGE_LOG)) || [];

  //Filtering Data With Logic AND
  for (var i = 0; i < OPTION_FILTER.length; i++) {
    var row_filter = OPTION_FILTER[i];
    //Re Init Data With Filter
    data = FILTER_DATA_INIT( data, row_filter );
  }

  //Sorting Default DESC By Time
  data.sort((a, b) => new Date(b.time) - new Date(a.time));

  return data;
}


// ============ Catch ALL Log Error ================
window.onerror = function(msg, src, line, col, err) {
  logError({
    message: msg,
    fileName: src,
    lineNumber: line,
    columnNumber: col,
    stack: err?.stack
  }, "ERROR GLOBAL", "GLOBAL");
};




