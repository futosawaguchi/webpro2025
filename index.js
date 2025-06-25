// Node.js の標準ライブラリである http と url を読み込む
import { createServer } from 'node:http';
import { URL } from 'node:url';

// 環境変数 `PORT` があればそれを使い、なければ 8888 を使う
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = createServer((req, res) => {
  // リクエストのURLをパースする
  const url = new URL(req.url, `http://${req.headers.host}`);

  // レスポンスのヘッダーに、文字コードをUTF-8に指定する
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // URLのパス名によって処理を分岐する
  if (url.pathname === '/') {
    console.log("ルートパス / へのアクセスがありました。");
    res.statusCode = 200; // 成功のステータスコード
    res.end('こんにちは！');
  } else if (url.pathname === '/ask') {
    console.log("/ask へのアクセスがありました。");
    // URLのクエリパラメータから 'q' を取得する
    const question = url.searchParams.get('q');
    res.statusCode = 200; // 成功のステータスコード
    res.end(`Your question is '${question}'`);
  } else {
    console.log("未定義のパスへのアクセスがありました。");
    res.statusCode = 404; // Not Found のステータスコード
    res.end('ページが見つかりません。');
  }
});

// 指定したポートでサーバーを起動する
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}/`);
});