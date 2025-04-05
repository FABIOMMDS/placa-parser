// api/parser.js
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { placa } = req.query;

  if (!placa) {
    return res.status(400).json({ erro: 'Placa não informada' });
  }

  const url = `https://placafipe.com/placa/${placa}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const tabela = $('.table').first();

    if (tabela.length === 0) {
      return res.status(404).json({ erro: 'Dados não encontrados para esta placa' });
    }

    const dados = {};
    tabela.find('tr').each((i, el) => {
      const chave = $(el).find('th').text().trim();
      const valor = $(el).find('td').text().trim();
      if (chave && valor) {
        dados[chave] = valor;
      }
    });

    res.status(200).json(dados);
  } catch (error) {
    console.error('Erro ao acessar:', error.message);
    res.status(500).json({ erro: 'Não foi possível acessar a página' });
  }
};
