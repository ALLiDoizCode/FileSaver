import MongoKitten

class MongoClient {
    var file_collection:MongoCollection!
    var myDatabase:Database!
    static var sharedInstance:MongoClient!
    init(){
        do {
            myDatabase = try MongoKitten.Database("mongodb://localhost/my_database")
            file_collection = myDatabase!["file_collection"]
            
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
