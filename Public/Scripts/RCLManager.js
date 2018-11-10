function sendChunk(chunk,seq){
    //console.log(chunk)
    var blob = blobManager.sendPayment("rpFWYxZe5kS6Ubwd6j3iu4fAGL6jgRzAzi","ssvQ5cMKUBwxYp7esAfnGG74w9fsA",seq,"50000","rGFWGqRZRVA8Zuok7yVg2AK4wJu51wRSDz","0.000001",null,null,[chunk.toUpperCase()])
    console.log(blob)
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
        /*var chunks = []
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
            tmp = _appendBuffer(tmp,hexToArrayBuffer(chunk))
        })
        var base = "data:"+"image/jpeg"+";base64,"+base64ArrayBuffer(tmp)
        console.log(tmp)
        console.log(base)
        console.log((total/1000000)+"XRP")
        if(callback) callback(obj);
        saveAs(base,"copy"+name);*/
    },address,start,end)
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
