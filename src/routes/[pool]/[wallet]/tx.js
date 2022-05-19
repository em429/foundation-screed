import RpcClient from 'bitcoind-rpc'

import { timeout } from '$lib/utils.js'

var rpc = new RpcClient({
    protocol: 'http',
    user: process.env['RPC_USER'],
    pass: process.env['RPC_PASS'],
    host: process.env['RPC_HOST'],
    port: process.env['RPC_PORT'],
})

// 1. search listTransactions for tx with given address and 'send' category
// 2. take amount from object matching
// 3. payout: display date, amount, type, hash
export async function get({ params }) {
    const wallet = params.wallet

    // Needed to detect timeout; symbols are always equal to themselves
    const timeoutError = Symbol()

    try {
        let prefiltered = await timeout(listTransactions('*', 100, 0), 7000, timeoutError)
        let transactions = prefiltered.filter(
            (tx) => tx.category === 'send' && tx.address === wallet
        )
        return {
            headers: {
                'cache-control': 'public, max-age=60',
            },
            body: { transactions },
        }
    } catch (e) {
        if (e === timeoutError) {
             console.log("Timeout Error in tx.js")
             transactions = []
             return {
                 headers: {
                     'cache-control': 'public, max-age=60',
                 },
                 body: { transactions },
             }

        } else {
             console.log("Error in tx.js while calling RPC API")
             transactions = []
             return {
                     headers: {
                         'cache-control': 'public, max-age=60',
                     },
                     body: { transactions },
                 }
             }
    }
}

const listTransactions = async (acc, count, skip) => {
    return new Promise((resolve, reject) => {
        rpc.listTransactions(acc, count, skip, (err, res) => {
            if (err) {
                reject(err)
                return err
            }
            resolve(res.result)
        })
    })
}

// async function getRawTransaction(txid) {
//     return new Promise((resolve, reject) => {
//         rpc.getRawTransaction(txid, 0, (err, res) => {
//             if (err) reject(err)
//             resolve(res.result)
//         })
//     })
// }
//
//
// async function decodeRawTransaction(txid) {
//     return new Promise((resolve, reject) => {
//         rpc.decodeRawTransaction(txid, (err, res) => {
//             if (err) reject(err)
//             resolve(res.result)
//         })
//     })
// }
//
//
// async function getTxRecipients(txid) {
//     let decoded_tx = await getRawTransaction(
//         'a5a269febbe1c2c5df7ded0137cf2071fbddfe38ed470e2856bffaa1c6121356'
//     ).then((tx) => decodeRawTransaction(tx))
//
//     let recipients = []
//     decoded_tx.vout[1].scriptPubKey.addresses.forEach((key, value) => {
//         recipients.push(value)
//     })
//
//     return recipients
// }
