# desafio-cadastro-de-clientes
Desafio

Criar uma tela de cadastro (CRUD) para o usuário inserir informações de empréstimos:
1.Cadastro de clientes (simples)
2.Cadastro de empréstimos (simples)
a) Data do empréstimo
b) Moeda (de preferência utilizar a lista do Banco Central)
c) Valor obtido
d) Taxa de conversão para reais em data atual (de preferência obtida no Banco Central)
e) Data de vencimento


O sistema deve informar:
1.Número de meses entre a data de vencimento e a data de financiamento
2.Valor que deve ser pago no vencimento (calculado com juros compostos)

Os dados devem ser persistidos em banco de dados, preferencialmente Postgresql.

Preferencialmente as moedas e a cotação em data atual devem ser obtidas via chamadas ao sistema do Banco Central do Brasil (BCB):
https://dadosabertos.bcb.gov.br/dataset/taxas-de-cambio-todos-os-boletins-diarios
https://dadosabertos.bcb.gov.br/dataset/taxas-de-cambio-todos-os-boletins-diarios/resource/9d07b9dc-c2bc-47ca-af92-10b18bcd0d69
