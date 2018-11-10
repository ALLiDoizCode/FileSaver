//
//  Account.swift
//  App
//
//  Created by Jonathan Green on 11/9/18.
//

import Vapor

struct Account:Content {
    var method:String
    var params:[AccountParams]
}

struct AccountParams:Content {
    var account:String
    var ledger_index:String
}
