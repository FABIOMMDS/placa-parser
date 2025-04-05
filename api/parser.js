// api/parser.js
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { placa } = req.query;

  if (!placa) {
    return res.status(400).json({ erro: 'Placa não informada' });
  }

  try {
    const url = `https://placafipe.com/placa/${placa}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ erro: 'Erro ao acessar o site' });
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const modelo = document.querySelector('td:contains("Modelo") + td')?.textContent.trim();
    const cor = document.querySelector('td:contains("Cor") + td')?.textContent.trim();
    const ano = document.querySelector('td:contains("Ano") + td')?.textContent.trim();

    res.status(200).json({ placa, modelo, cor, ano });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao processar a requisição' });
  }
}
