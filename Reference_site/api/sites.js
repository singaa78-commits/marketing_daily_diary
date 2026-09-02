module.exports = async function handler(req, res) {
  const webAppUrl = process.env.SHEETS_WEBAPP_URL;
  const secret = process.env.SHEETS_API_SECRET;

  if (!webAppUrl || !secret) {
    res.status(500).json({ error: "Google Sheets 연동 환경변수가 설정되지 않았습니다." });
    return;
  }

  try {
    if (req.method === "GET") {
      const response = await fetch(webAppUrl);
      const data = await response.json();
      res.status(200).json(data);
      return;
    }

    if (req.method === "POST") {
      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...req.body, secret }),
      });
      const data = await response.json();
      res.status(200).json(data);
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(502).json({ error: "Google Sheets 연동 요청에 실패했습니다." });
  }
};
