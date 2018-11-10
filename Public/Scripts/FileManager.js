
  var inputElement = document.getElementById("document");
  var image = document.getElementById("image");
  var fileReader = new FileReader();
  var previous = [];
  var chunks = [];
  var blobs = []
  var partial;
  var type;
  var name;

  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    var file = this.files[0];
    if(file.type == "" || file == undefined){
        type = "text/plain;charset=utf-8"
    }else {
        type = file.type
    }
    name = file.name
    if(file===undefined){
        return;
    }
    var counter = 0;
   
    loading(file,
      function (data) {
          counter += data.byteLength;
          console.log((( counter / file.size)*100).toFixed(0) + '%');
      }, function () {
        var tmp = new Uint8Array()
        var seq;
        console.log(chunks.length)
        accountInfo(function(obj){
            seq = obj.result.account_data.Sequence
            var num = 1
            console.log(obj)
            chunks.forEach(function(chunk){
                var blob = sendChunk(chunk,seq)
                blobs.push(blob)
                seq++
                var percent = (num/chunks.length) * 100
                console.log("Signed "+Math.round(percent)+"%")
                num++
                //tmp = _appendBuffer(tmp,hexToArrayBuffer(chunk))
            })
            console.log(chunks.length)
            console.log(blobs.length)
            console.log(blobs[0])  
            if(blobs.length == chunks.length){
                //saveChunks(blobs,0)
                previous = [];
                chunks = [];
                blobs = [];
                partial;   
            }  
        },"rpFWYxZe5kS6Ubwd6j3iu4fAGL6jgRzAzi")
        //var base = "data:"+type+";base64,"+base64ArrayBuffer(tmp)
        /*console.log(tmp)
        console.log(base)*/
        //saveAs(base,"copy"+name);
        console.log('100% Done');            
    });
  }

  function loading(file, callbackProgress, callbackFinal) {
   var chunkSize  = 500; // bytes
   var offset     = 0;
   var size=chunkSize;
   
   var index = 0;

   if(file.size===0){
      callbackFinal();
   }
   while (offset < file.size) {
      partial = file.slice(offset, offset+size,type);
      var reader = new FileReader;
      reader.size = chunkSize;
      reader.offset = offset;
      reader.index = index;
      reader.onload = function(evt) {
         var chunk = evt.target.result;
         chunks.push(buf2hex(chunk));
         callbackRead(this, file, evt, callbackProgress, callbackFinal);
      };
      reader.readAsArrayBuffer(partial);
      offset += chunkSize;
      index += 1;
   }
}
  var lastOffset = 0;
  function callbackRead(reader, file, evt, callbackProgress, callbackFinal){

    if(lastOffset !== reader.offset){
        // not of order chunk: put into buffer
        previous.push({ offset: reader.offset, size: reader.size, result: reader.result});
        return;
    }

    function parseResult(offset, size, result) {
        lastOffset = offset + size;
        callbackProgress(result);
        if (offset + size >= file.size) {
            lastOffset = 0;
            callbackFinal();
        }
    }

    // in order chunk
    parseResult(reader.offset, reader.size, reader.result);

    // check previous buffered chunks
    var buffered = [{}]
    while (buffered.length > 0) {
        buffered = previous.filter(function (item) {
            return item.offset === lastOffset;
        });
        buffered.forEach(function (item) {
            parseResult(item.offset, item.size, item.result);
            previous.remove(item);
        })
    }

  }

  Array.prototype.remove = Array.prototype.remove || function(val){
    var i = this.length;
    while(i--){
        if (this[i] === val){
            this.splice(i,1);
        }
    }
  }
  /*var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    var data = event.target.result;
    console.log('Data: ' + data);
  };
  reader.readAsBinaryString(file);*/
 