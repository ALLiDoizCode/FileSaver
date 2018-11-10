//
//  ClientRoute.swift
//  App
//
//  Created by Jonathan Green on 11/9/18.
//

import Vapor

enum ClientRoute {
    case accountInfo(account:Account)
    case history(address:String,min:String,max:String)
    case submit(blob:Blob)
    
    func request() throws -> HTTPRequest {
        var httpReq = HTTPRequest()
        switch self {
        case .accountInfo(let account):
            httpReq = HTTPRequest(method: .POST, url: "\(Constants().prodURL)")
            httpReq.contentType = .json
            let jsonDecoder = JSONEncoder()
            let data = try jsonDecoder.encode(account)
            let stringValue = String(data: data, encoding: .utf8) ?? "{}"
            httpReq.body = HTTPBody(string: stringValue)
        case .history(let address, let min, let max):
            httpReq = HTTPRequest(method: .GET, url: "\(Constants().DatraURL)accounts/\(address)/transactions?type=Payment&result=tesSUCCESS&limit=1000&min_sequence=\(min)&max_sequence=\(max)")
            httpReq.contentType = .json
        case .submit(let blob):
            httpReq = HTTPRequest(method: .POST, url: "\(Constants().prodURL)")
            httpReq.contentType = .json
            let jsonDecoder = JSONEncoder()
            let data = try jsonDecoder.encode(blob)
            let stringValue = String(data: data, encoding: .utf8) ?? "{}"
            httpReq.body = HTTPBody(string: stringValue)
        }
        return httpReq
    }
}
