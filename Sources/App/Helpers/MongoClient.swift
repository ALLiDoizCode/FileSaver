import MongoKitten

class MongoClient {
    var file_collection:MongoCollection!
    var database:Database!
    var server:Server!
    static var sharedInstance:MongoClient!
    init(){
        do {
            server = try Server("mongodb://heroku_4cdzkbft:dcdb8e4f10v2ldjt9jb56dacrh@ds141406.mlab.com:41406/heroku_4cdzkbft")
            database = server["heroku_4cdzkbft"]
            file_collection = database!["file_collection"]
        
            if server.isConnected {
                print("Connected successfully to server")
            }
            
        }catch {
            
        }
        MongoClient.sharedInstance = self
    }
    
    func getFiles(address:String) -> [Document]{
        var docs:[Document] = []
        do{
            for document in try file_collection.find("address" == address) {
                // do something with document
                docs.append(document)
            }
        }catch{
            
        }
        
        return docs
    }
    
    func saveFile(fileInfo:FileInfo) -> Bool{
        
        let encoder = BSONEncoder()
        
        do{
            let doc = try encoder.encode(fileInfo)
            try file_collection.insert(doc)
        }catch{
            return false
        }
        
        return true
    }
}
