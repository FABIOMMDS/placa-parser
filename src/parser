const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function (placa) {
  try {
    const url = `https://placafipe.com/placa/${placa}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data = {};

    $('div.list-group-item').each((i, el) => {
      const label = $(el).find('h4').text().trim();
      const value = $(el).find('p').text().trim();
      data[label] = value;
    });

    return data;
  } catch (error) {
    throw new Error('Erro ao consultar a placa ou placa inválida.');
  }
};
