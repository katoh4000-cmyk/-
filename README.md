# 毎日の自己管理（PWA版）

iPhone の Safari で「ホーム画面に追加」して使う Web アプリです。
元は claude.ai のアーティファクト（https://claude.ai/artifact/6Js1zjtyoiopfS6AxymXaK）で、機能と画面はそのまま引き継いでいます。

## ファイル構成
- `index.html` … アプリ本体（元のアーティファクトに PWA 化・AI 接続・設定・バックアップを追加）
- `manifest.webmanifest` / `icons/` … ホーム画面用の名前・アイコン
- `sw.js` … オフラインで起動するためのキャッシュ
- `vendor/anthropic-sdk-1.5.0.mjs` … Anthropic 公式 TypeScript SDK 1.5.0 をブラウザ用に1ファイルにまとめたもの

## 公開方法（例：GitHub Pages）
1. このフォルダの中身をリポジトリに置いて、GitHub Pages を有効にします（HTTPS が必須です）。
2. iPhone の Safari で公開した URL を開き、共有ボタン →「ホーム画面に追加」を選びます。
3. アプリ下部の「アプリ設定」で Anthropic の API キーを入力し、「接続テスト」を押します。

## データ
- 記録はその iPhone 内（ホーム画面アプリの保存領域）にだけ保存されます。
- Safari で開いた場合とホーム画面アプリで開いた場合は保存領域が別になります。
- 「アプリ設定 → バックアップ」で JSON ファイルの書き出し・読み込みができます（API キーは含みません）。

## AI 機能
- 写真の栄養分析、オムロン画面の読み取り、トレーナーの総評、今日の気づきに Claude API を使います。
- API キーは端末内に保存し、ブラウザから直接 Anthropic の API に送ります。個人で使う前提の構成です。
- モデルは設定画面で選べます（既定は Claude Opus 5.5）。
