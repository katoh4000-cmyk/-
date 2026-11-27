/**
 * 毎日の自己管理：Google Drive 同期用スクリプト
 * アプリから送られた記録を、Google Drive の「毎日の自己管理」フォルダに JSON で保存します。
 *  - 毎日の自己管理_記録.json … 常に最新の記録（Claude に読んでもらうのはこのファイル）
 *  - 履歴/記録_YYYY-MM-DD.json … 日ごとの控え（同じ日は上書き）
 */
const TOKEN = 'ここにアプリで作成した合言葉を貼り付け';
const FOLDER_NAME = '毎日の自己管理';
const FILE_NAME = '毎日の自己管理_記録.json';
// 保存先フォルダのID（フォルダURLの /folders/ の後ろの文字列）。空欄ならマイドライブ直下の FOLDER_NAME を使う
const FOLDER_ID = '';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (!TOKEN || TOKEN.indexOf('ここに') === 0 || body.token !== TOKEN) return out_({ ok: false, error: 'bad token' });
    const json = JSON.stringify({ app: body.app, version: body.version, sentAt: body.sentAt, savedAt: new Date().toISOString(), data: body.data }, null, 1);
    const folder = FOLDER_ID ? DriveApp.getFolderById(FOLDER_ID) : folder_(DriveApp.getRootFolder(), FOLDER_NAME);
    upsert_(folder, FILE_NAME, json);
    const day = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
    upsert_(folder_(folder, '履歴'), '記録_' + day + '.json', json);
    return out_({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return out_({ ok: true, message: '毎日の自己管理 同期スクリプトは動作しています' });
}

function folder_(parent, name) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

function upsert_(folder, name, text) {
  const it = folder.getFilesByName(name);
  if (it.hasNext()) it.next().setContent(text);
  else folder.createFile(name, text, 'application/json');
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
