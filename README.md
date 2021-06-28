# GoQZipCode
GoQZipCodeは、郵便番号もしくは住所から該当する住所を検索し、住所データを受け取ることができます。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [サポートブラウザ](#%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6)
- [デモページ](#%E3%83%87%E3%83%A2%E3%83%9A%E3%83%BC%E3%82%B8)
- [インストール](#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
- [API](#api)
  - [初期化](#%E5%88%9D%E6%9C%9F%E5%8C%96)
  - [オプション](#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
  - [データ返り値](#%E3%83%87%E3%83%BC%E3%82%BF%E8%BF%94%E3%82%8A%E5%80%A4)
  - [郵便番号から住所を検索](#%E9%83%B5%E4%BE%BF%E7%95%AA%E5%8F%B7%E3%81%8B%E3%82%89%E4%BD%8F%E6%89%80%E3%82%92%E6%A4%9C%E7%B4%A2)
    - [完全一致](#%E5%AE%8C%E5%85%A8%E4%B8%80%E8%87%B4)
    - [前方一致](#%E5%89%8D%E6%96%B9%E4%B8%80%E8%87%B4)
  - [住所から郵便番号を検索](#%E4%BD%8F%E6%89%80%E3%81%8B%E3%82%89%E9%83%B5%E4%BE%BF%E7%95%AA%E5%8F%B7%E3%82%92%E6%A4%9C%E7%B4%A2)
    - [完全一致](#%E5%AE%8C%E5%85%A8%E4%B8%80%E8%87%B4-1)
    - [前方一致](#%E5%89%8D%E6%96%B9%E4%B8%80%E8%87%B4-1)
    - [部分一致](#%E9%83%A8%E5%88%86%E4%B8%80%E8%87%B4)
- [ライセンス](#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## サポートブラウザ
InternetExplorerを除く、モダンブラウザで使用可能です。　

## デモページ
以下のデモページから使用できるメソッドやオプションの一覧が確認できます。  
[デモページ](https://goqsysteminc.github.io/GoqZipCode/)

[comment]: <> (masterマージ後、ブランチを変更する)

## インストール
`npm`を使用します。
```shell
$ npm install goqzipcode
```
もしくは`yarn`を使用します。
```shell
$ yarn add goqzipcode
```

## API
### 初期化
インポートした`GoQZipCode`を初期化します。
```javascript
// node.js
const { GoQZipCode } = require('goqzipcode')
// ES6
import { GoQZipCode } from 'goqzipcode'
// initialize
const goqZipCode = new GoQZipCode()
```

### オプション
| 名前 | 型 | 初期値 | 説明 |
----|----|----|----
| limit  | number  | 50 | 取得する住所の上限 |
| is_hyphen  | boolean  | true | 返り値の郵便番号にハイフン(-)を含むか |

```javascript
const options = {
  limit: 100,
  is_hyphen: false
};

const goqZipCode = new GoqZipCode(options);
```

### データ返り値
配列の中に該当したデータがオブジェクト形式で返ります。

| 名前 | 型 | 説明 |
----|----|----
| city  | string  | 市区 |
| pref  | string  | 都道府県 |
| town  | string  | 町村 |
| zipcode  | string  | 郵便番号 |

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

※ -(ハイフン)があった場合、-は除外してカウントされます。

引数のオブジェクトプロパティは以下を設定します。

| 名前 | 型 | 説明 |
----|----|----
| zipcode  | string  | 郵便番号 |
| is_exact  | boolean  | 完全一致の有無 |

#### 完全一致
入力番号が7文字必須です。  
入力番号と一致したデータを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  zipcode: '1040031',
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
入力番号が2文字以上必須です。  
入力番号から都度データ照合をして、該当したデータを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  zipcode: '1040031',
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

※いずれも3文字以上必須になります。

引数のオブジェクトプロパティは以下を設定します。

| 名前 | 型 | 説明 |
----|----|----
| address  | string  | 住所 |
| is_exact  | boolean  | 完全一致の有無 |
| is_left  | boolean  | 前方一致の有無 |

#### 完全一致
入力された住所と一致したデータを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  address: '東京都中央区京橋',
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
入力された住所と都度データ照合をして、該当したデータを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  address: '東京都中央区',
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
入力された住所が部分的に該当したデータを返します。

```javascript
goqZipCode.searchAddressFromZipcode({
  address: '中央区京橋',
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

## ライセンス
MIT License &copy;GoQSystem Inc.
