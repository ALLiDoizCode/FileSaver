function sendChunk(chunk,seq){
    //console.log(chunk)
    var blob = blobManager.sendPayment("rpFWYxZe5kS6Ubwd6j3iu4fAGL6jgRzAzi","ssvQ5cMKUBwxYp7esAfnGG74w9fsA",seq,"50000","rGFWGqRZRVA8Zuok7yVg2AK4wJu51wRSDz","0.000001",null,null,[chunk.toUpperCase()])
    console.log(blob)
    console.log(blob.txJson.Memos[0].Memo.MemoData.hexDecode())
    return blob
}

function saveChunks(chunks,i){
    submit(function(obj){
        console.log(obj)
        i++
        saveChunks(chunks,i)
    },chunks[i].signedTransaction)
}

function getChunks(callback,address,start,end){
    var tmp = new Uint8Array()
    var total = 0;
    accountHistory(function(obj){
        console.log(obj)
        formFile(callback)
    },address,start,end)
}

function formFile(callback) {
    var chunks = []
    var name;
    var type;
    var objReverse = obj.result.transactions.reverse()
    for(var i = start; start <= end; start++){
        if(objReverse[i].tx.Memos != undefined){
            chunks.push(transaction.tx.Memos[0].Memo.MemoData)
            var amount = parseInt(transaction.tx.Amount)
            var fee = parseInt(transaction.tx.Fee)
            total = total + fee + amount
            console.log(transaction.tx)
        }
    }
    console.log(chunks.length)
    chunks.forEach(function(chunk){
        if(chunk == chunks[0]){
            var fileInfo = JSON.parse(chunk)
            console.log(fileInfo)
            console.log(fileInfo.name)
            console.log(fileInfo.type)
            name = fileInfo.name
            type = fileInfo.type
        }else {
            //tmp = _appendBuffer(tmp,hexToArrayBuffer(chunk))
        }
    })
    /*var base = "data:"+type+";base64,"+base64ArrayBuffer(tmp)
    console.log(tmp)
    console.log(base)
    console.log((total/1000000)+"XRP")
    if(callback) callback(obj);
    saveAs(base,name);*/
}

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

/*getChunks(function(){

},"rNhd9kzNBS4foYxm6NLHBj5Ve3XPVeBo2k","1","53")*/
/*Address
rpFWYxZe5kS6Ubwd6j3iu4fAGL6jgRzAzi
Secret
ssvQ5cMKUBwxYp7esAfnGG74w9fsA


Address
rGFWGqRZRVA8Zuok7yVg2AK4wJu51wRSDz
Secret
saDhquCjhzMYbbdBH8Psob1RnKAFE*/
