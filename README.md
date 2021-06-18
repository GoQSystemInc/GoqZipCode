# GoQZipCode
GoQZipCodeは郵便番号(もしくは住所)から該当する住所を検索し、住所データを受け取ることができます。

## デモページ
以下のデモページから使用できるメソッドやオプションの一覧が確認できます。  
[ここにデモページのURLを](https://example.com){:target="_blank"}

## インストール
NpmもしくはYarnを使用します。

Npmを使用する
```shell
$ npm install goqzipcode
```
Yarnを使用する
```shell
$ yarn add goqzipcode
```

## 使用方法
インポートした`GoQZipCode`を初期化します。
```javascript
// node.js
const { GoQZipCode } = require('goqzipcode')
// ES6~
import { GoQZipCode } from 'goqzipcode'
// initialize
const goqZipCode = new GoQZipCode()
```

### データ型
検索後、返り値として、住所情報オブジェクトが取得できます。
```javascript
[
  {
    city: "",
    pref: "",
    town: "",
    zipcode: ""
  }
]
```

### 郵便番号から住所を検索
郵便番号から住所を検索するには`searchAddressFromZipcode`メソッドを使用します。

データを検索するタイミングとして、**完全一致**・**前方一致**が可能です。

#### 完全一致
郵便番号を入力し、一致したデータがあればそのデータを返します。
`is_exact: true`を設定してください。

```javascript
goqZipCode.searchAddressFromZipcode({
  zipcode: 'xxx-xxxx',
  is_exact: true
})
  .then(result => {
    // do sccess handling 
  })
  .catch(() => {
    // do failure handling 
  })
```

#### 前方一致
郵便番号を入力し、その都度データ照合をして該当したデータを返します。
`is_exact: false`を設定してください。

```javascript
goqZipCode.searchAddressFromZipcode({
  zipcode: '100-0002',
  is_exact: false
})
  .then(result => {
    // do sccess handling 
  })
  .catch(() => {
    // do failure handling 
  })
```

### 住所から郵便番号を検索
住所から郵便番号を検索するには`searchZipcodeFromAddress`メソッドを使用します。

データを検索するタイミングとして、**完全一致**・**前方一致**・**部分一致**が可能です。

#### 完全一致
住所を入力し、その住所がデータと一致した時に、その一致したデータを返します。
`is_exact: true`を設定してください。

```javascript
goqZipCode.searchAddressFromZipcode({
  zipcode: '100-0002',
  is_exact: true
})
  .then(result => {
    // do sccess handling 
  })
  .catch(() => {
    // do failure handling 
  })
```
