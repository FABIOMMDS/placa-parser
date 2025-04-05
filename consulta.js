const { getVehicleData } = require('./index');

const placa = 'AIS4A09'; // Substitua por uma placa válida

getVehicleData(placa).then(dados => {
  console.log('Dados do veículo:');
  console.log(dados);
}).catch(err => {
  console.error('Erro ao buscar dados:', err.message);
});
