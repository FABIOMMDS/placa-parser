import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { placa } = req.query;

  if (!placa) {
    return res.status(400).json({ erro: 'Placa não informada' });
  }

  try {
    const response = await fetch(`https://placafipe.com/placa/${placa}`);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const rows = document.querySelectorAll('table tbody tr');
    const data = {};

    rows.forEach((row) => {
      const tds = row.querySelectorAll('td');
      if (tds.length === 2) {
        const label = tds[0].textContent.trim();
        const value = tds[1].textContent.trim();
        data[label] = value;
      }
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ erro: 'Erro ao acessar a página' });
  }
}
