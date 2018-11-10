//
//  RCLControlle.swift
//  App
//
//  Created by Jonathan Green on 11/9/18.
//

import Vapor
import MongoKitten

class RCLController {
    var router:Router?
    var apiClient = APIClient()
    init(router:Router) {
        self.router = router
        let RCLRoute = router.grouped("RCL")
        RCLRoute.get("history",String.parameter,String.parameter,String.parameter,use: history)
        RCLRoute.get("getFiles",String.parameter,use: getFiles)
        RCLRoute.post("saveFile",use: saveFile)
        RCLRoute.post("accountInfo",use: accountInfo)
        RCLRoute.post("submit",use: submit)
    }
    
    func accountInfo(req: Request) throws -> Future<Response> {
        let account = try req.content.decode(Account.self)
        return account.flatMap(to: Response.self) { object in
            print(object)
            let client = try req.make(Client.self)
            let container = req.sharedContainer
            let platforms = try self.apiClient.send(client:client, clientRoute: .accountInfo(account:object), container: container, response: req.response())
            return platforms.map({ orderResponse in
                print(orderResponse)
                let response = req.response()
                response.http.status = orderResponse.http.status
                response.http.body = orderResponse.http.body
                return response
            })
        }
    }
    
    func saveFile(req: Request) throws -> Response {

        let fileInfo = try req.content.decode(FileInfo.self)
        fileInfo.map { object in
            print(object)
            MongoClient.sharedInstance.saveFile(fileInfo:object)
            return
        }
        req.response().http.status = HTTPResponseStatus.ok
        let response = req.response()
        return response
    }
    
    func getFiles(req: Request) throws -> Response {
        let address = try req.parameters.next(String.self)
        let docs = MongoClient.sharedInstance.getFiles(address: address)
        let bsonDecoder = BSONDecoder()
        let jsonEncoder = JSONEncoder()
        var files:[FileInfo] = []
        for doc in docs {
            if let fileInfo = try? bsonDecoder.decode(FileInfo.self, from: doc) {
                files.append(fileInfo)
            }
        }
        
        let data = try jsonEncoder.encode(files)
        let response = req.response()
        response.http.body = HTTPBody(data: data)
        
        return response
    }
    
    func history(req: Request) throws -> Future<Response>{
        let address = try req.parameters.next(String.self)
        let min = try req.parameters.next(String.self)
        let max = try req.parameters.next(String.self)
        let client = try req.make(Client.self)
        let container = req.sharedContainer
        let platforms = try self.apiClient.send(client:client, clientRoute: .history(address: address, min: min, max: max), container: container, response: req.response())
        return platforms.map({ orderResponse in
            print(orderResponse)
            let response = req.response()
            response.http.status = orderResponse.http.status
            response.http.body = orderResponse.http.body
            return response
        })
    }
    
    func submit(req: Request) throws -> Future<Response>{
        let blob = try req.content.decode(Blob.self)
        return blob.flatMap(to: Response.self) { object in
            print(object)
            let client = try req.make(Client.self)
            let container = req.sharedContainer
            let platforms = try self.apiClient.send(client:client, clientRoute: .submit(blob: object), container: container, response: req.response())
            return platforms.map({ orderResponse in
                print(orderResponse)
                let response = req.response()
                response.http.status = orderResponse.http.status
                response.http.body = orderResponse.http.body
                return response
            })
        }
        
    }
}
