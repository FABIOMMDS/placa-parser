const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  const { placa } = req.query;
  if (!placa) return res.status(400).json({ erro: "Placa não informada" });

  try {
    const response = await axios.get(`https://placafipe.com/placa/${placa}`);
    const $ = cheerio.load(response.data);

    const dados = {};
    $("table tr").each((i, el) => {
      const key = $(el).find("th").text().trim();
      const value = $(el).find("td").text().trim();
      if (key && value) dados[key] = value;
    });

    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ erro: "Não foi possível acessar a página" });
  }
};
