const consultarPlaca = require('./src/parser');

const placa = process.argv[2];

if (!placa) {
  console.error('⚠️  Por favor, informe uma placa. Ex: node consulta.js ABC1234');
  process.exit(1);
}

consultarPlaca(placa)
  .then(dados => {
    console.log('✅ Dados encontrados:\n');
    console.log(JSON.stringify(dados, null, 2));
  })
  .catch(err => {
    console.error('❌ Erro:', err.message);
  });
