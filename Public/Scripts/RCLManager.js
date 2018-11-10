var address = ""
var secret = ""
var recievingAddress = ""


getFiles(function(obj){
    console.log(obj)
    let fileAddress = obj[1].address
    let start = obj[1].start
    let end = obj[1].end
    let name = obj[1].name
    getChunks(function(myobj){

    },fileAddress,start,end)
},address)
function sendChunk(chunk,seq){
    //console.log(chunk)
    var blob = blobManager.sendPayment(address,secret,seq,"50000",recievingAddress,"0.000001",null,null,[chunk.toUpperCase()])
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
    accountHistory(function(obj){
        console.log(obj)
        formFile(callback,obj)
    },address,start,end)
}

function formFile(callback,obj) {
    var tmp = new Uint8Array()
    var total = 0;
    var chunks = []
    var name;
    var type;
    var transactions = obj.transactions
    for(var i = 0; i < transactions.length; i++){
        if(transactions[i].tx.Memos != undefined){
            chunks.push(transactions[i].tx.Memos[0].Memo.MemoData)
            var amount = parseInt(transactions[i].tx.Amount)
            var fee = parseInt(transactions[i].tx.Fee)
            total = total + fee + amount
            console.log(transactions[i].tx)
        }
    }
    console.log(chunks.length)
    chunks.forEach(function(chunk){
        if(chunk == chunks[0]){
            console.log(chunk.hexDecode())
            var fileInfo = JSON.parse(chunk.hexDecode())
            console.log(fileInfo)
            console.log(fileInfo.name)
            console.log(fileInfo.type)
            name = fileInfo.name
            type = fileInfo.type
        }else {
            tmp = _appendBuffer(tmp,hexToArrayBuffer(chunk))
        }
    })
    var base = "data:"+type+";base64,"+base64ArrayBuffer(tmp)
    console.log(tmp)
    console.log(base)
    console.log((total/1000000)+"XRP")
    if(callback) callback(obj);
    saveAs(base,name);
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
