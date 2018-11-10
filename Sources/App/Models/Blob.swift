//
//  Blob.swift
//  App
//
//  Created by Jonathan Green on 11/9/18.
//

import Vapor

struct Blob:Content {
    var method:String
    var params:[BlobParams]
    
}

struct BlobParams:Content {
    var tx_blob:String
}
