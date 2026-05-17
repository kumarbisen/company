const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const PORT = process.env.PORT || 4000

app.get('/meta', async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ error: 'missing url' })
  try {
    const resp = await axios.get(url, { timeout: 7000 })
    const html = resp.data
    const $ = cheerio.load(html)
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || null
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || null
    return res.json({ title, description })
  } catch (err) {
    return res.status(500).json({ error: 'failed to fetch', details: err.message })
  }
})

app.listen(PORT, () => console.log(`meta server listening on ${PORT}`))
