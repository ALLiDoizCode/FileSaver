
var LOCAL_SERVER = "http://localhost:8080/"
var SERVER = LOCAL_SERVER

function accountInfo(callback,address) {
  var json = {
    "method": "account_info",
    "params": [
      {
        "account": address,
        "ledger_index":"validated"
      }
    ]
    
  }
  var jsonString = JSON.stringify(json);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(xhttp.responseText);
      if(callback) callback(json);
    }else {
    }
  };
  xhttp.open("POST", "RCL/accountInfo/", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonString);        
}

let getTransaction = function(callback,hash) {
  var xhttp = new XMLHttpRequest();
  var daJson = {
    "method": "tx",
    "params": [
      {
        "transaction": hash,
        "binary": false
      }
    ]
  }
  var myJsonString = JSON.stringify(daJson);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(xhttp.responseText);
        if(callback) callback(myObj);
      }else {
      }
  };
  xhttp.open("POST", PUBLIC_SERVER, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(myJsonString);
}

function saveFile(callback,address,start,end,name){
  var json = {
    address:address,
    start:start,
    end:end,
    name:name
  }

  var jsonString = JSON.stringify(json);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //var myObj = JSON.parse(xhttp.responseText);
        if(callback) callback();
      }else {
      }
  };
  xhttp.open("POST", "RCL/saveFile", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonString);
}


function getFiles(callback,address){
 
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(xhttp.responseText);
        if(callback) callback(myObj);
      }else {
      }
  };
  xhttp.open("GET", "RCL/getFiles/"+address, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}
function accountHistory(callback,address,min_sequence,max_sequence) {
  var url = "RCL/history/"+address+"/"+min_sequence+"/"+max_sequence;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var myObj = JSON.parse(xhttp.responseText);
      if(callback) callback(myObj);
    }else {
    }

  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

let submit = function(callback,txBlob) {
  var xhttp = new XMLHttpRequest();
  var json = {
    "method": "submit",
    "params": [
      {
        "tx_blob": txBlob,
      }
    ]
  }
  var jsonString = JSON.stringify(json);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(xhttp.responseText);
        if(callback) callback(myObj);
      }else {
      }
  };
  xhttp.open("POST", "RCL/submit/", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonString);
}

/*function submit(callback,txBlob) {
  var object = "blob="+txBlob+"&type="+"submit";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttp.responseText);
        var myObj = JSON.parse(xhttp.responseText);
        if(callback) callback(myObj);
      }else {
      }
  };
  xhttp.open("POST", SERVER+"submitBlob", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(object);
}*/
