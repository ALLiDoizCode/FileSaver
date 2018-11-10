//
//  RCLControlle.swift
//  App
//
//  Created by Jonathan Green on 11/9/18.
//

import Vapor

class RCLController {
    var router:Router?
    var apiClient = APIClient()
    init(router:Router) {
        self.router = router
        let RCLRoute = router.grouped("RCL")
        RCLRoute.get("history",String.parameter,String.parameter,String.parameter,use: history)
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
