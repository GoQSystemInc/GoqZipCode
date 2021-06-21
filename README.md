# GoQZipCode
GoQZipCodeは郵便番号(もしくは住所)から該当する住所を検索し、住所データを受け取ることができます。

## デモページ
以下のデモページから使用できるメソッドやオプションの一覧が確認できます。  
[ここにデモページのURLを](https://example.com)

## インストール
```shell
$ npm install goqzipcode
```
もしくは
```shell
$ yarn add goqzipcode
```

## 使用方法

### 初期化
インポートした`GoQZipCode`を初期化します。
```javascript
// node.js
const { GoQZipCode } = require('goqzipcode')
// ES6~
import { GoQZipCode } from 'goqzipcode'
// initialize
const goqZipCode = new GoQZipCode()
```

この時、以下のオプションを設定することができます。
| 名前 | 型 | 初期値 | 説明 
| limit  | number  | 50 | 取得する住所の上限
| is_hyphen  | boolean  | true | 郵便番号のハイフン（-）の有無
```javascript
const options = {
  limit: 100,
  is_hyphen: false
};

const goqZipCode = new GoqZipCode(options);
```

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
郵便番号を入力し、一致したデータがあった場合、データを返します。  

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
郵便番号を入力し、先頭から都度データ照合をして該当した場合、データを返します。

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
住所を入力し、その住所がデータと一致した場合、データを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  address: 'xx県oo市',
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
住所を入力し、先頭から都度データ照合をして該当した場合、データを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  address: 'xx県oo市',
  is_exact: false,
  is_left: true
})
  .then(result => {
    // do sccess handling 
  })
  .catch(() => {
    // do failure handling 
  })
```

#### 部分一致
住所を入力し、入力データが部分的に該当した場合に、データを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  address: 'xx市oo町',
  is_exact: false,
  is_left: false
})
  .then(result => {
    // do sccess handling 
  })
  .catch(() => {
    // do failure handling 
  })
```
