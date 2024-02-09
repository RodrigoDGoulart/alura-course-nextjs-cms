export default async function handler(req, res) {
  const previousPage = req.headers.referer;

  req.preview ? res.clearPreviewData() : res.setPreviewData({});
  res.writeHead(307, { Location: previousPage });
  res.end();
}
