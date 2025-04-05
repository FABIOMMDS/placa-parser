import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { placa } = req.query;

  if (!placa) {
    return res.status(400).json({ erro: 'Placa não fornecida' });
  }

  const url = `https://placafipe.com/placa/${placa}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    const result = {};

    $('table tr').each((i, row) => {
      const th = $(row).find('th').text().trim();
      const td = $(row).find('td').text().trim();
      if (th && td) result[th] = td;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao acessar a página' });
  }
}
