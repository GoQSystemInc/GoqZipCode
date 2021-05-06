// TODO: fetchに変更する
import axios from 'axios'

import { convertZipCode } from './utils'
import * as app from './types'

export class GoqZipCode {
  static addressJson: string = './assets/zipcodes_min.json'
  static addressData: app.responses = []

  constructor() {}

  // 初期化
  // ※ユーザーがinit()した場合、jsonファイルの容量が大きく、
  // 他の動作に支障が出るため、ライブラリ側で実行する
  private static async init() {
    this.addressData = await this.fetchAddressJson(this.addressJson)
  }

  // jsonデータを取得して保持
  private static async fetchAddressJson(json: string): Promise<app.responses> {
    return new Promise(async (resolve, reject) => {
      await axios.get(json)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((e: Error) => {
          // TODO
          reject(e)
        })
    })
  }

  // 郵便番号から検索
  async searchZipcode(data: app.requestSearchZipCode): Promise<app.responses> {
    return new Promise(async (resolve, reject) => {
      const zipCode = convertZipCode(data.zipcode)

      // 2文字未満は処理しない
      if (zipCode.length <= 1) {
        reject('2文字以上必要です')
      }

      // jsonデータを取得してない場合
      if (!GoqZipCode.addressData.length) {
        await GoqZipCode.init()
      }

      // データの格納
      const payload: app.response[] = []
      const len: number = GoqZipCode.addressData.length

      // mapやらreduceだとループの途中で抜けられないので
      // 普通のfor文で回すことにする
      for (let i: number = 0; i < len; i++) {
        // データは50件まで
        if (payload.length >= 50) break

        const rule:RegExp = new RegExp(`^${zipCode}`)
        const address: app.response = GoqZipCode.addressData[i]

        if (rule.test(address.zipcode)) {
          payload.push(address)
        }
      }

      resolve(payload)
    })
  }
}
