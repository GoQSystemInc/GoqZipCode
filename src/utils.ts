// 全角の数字を半角に変換 ハイフンが入っていても数字のみの抽出
export function convertZipCode (zipCode: string) {
  const a:string = zipCode.replace(/[０-９]/g, (s: string) => String.fromCharCode(s.charCodeAt(0) - 65248))
  const b:RegExpMatchArray = a.match(/\d/g) || []

  return b.join('')
}
