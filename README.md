<h1 align="center">Demo de testes de performance utilizando o K6 + Grafana + InfluxDB</h1>

Projeto de arquitetura e esqueleto de testes de performance utilizando o K6.

## Instalação e Configuração

- Instalação [**k6**](https://k6.io/docs/getting-started/installation/)
- Instalação [**docker/docker-compose**](https://www.docker.com/get-started)

- ```npm i```   
### Execução simplificada dos testes subindo containers de Grafana e InfluxDB: 

  -  ```docker:FullFlowSmoke```
    ```docker:FullFlowLoad```
    ```docker:FullFlowSoak```
    ```docker:FullFlowSpike```
    ```docker:FullFlowStress```
### Execução sem Docker, Grafana e InfluxDB: 
- Com npm:
  - ```npm run FullFlowLoadTest```    
- Sem npm:
  - ```k6 run src/simulations/FullFlowLoad.test.js```

### Containers de Grafana e InfluxDB podem ser parados manualmente usando 
  ```npm run docker:up```  
  ```npm run docker:down```  
  
* Os dashboards do Grafana ficam disponíveis [aqui](http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s)

## Tipos de Testes de Performance apresentados nesse projeto:  
- Smoke Test
  - A idéia desse teste é verificar se nada quebrou toda vez que escrever um novo script ou modificar um script existente ou até mesmo se o sistema não gerou nenhum erro quando estiver sob carga mínima.
![Smoke Test](https://k6.io/docs/static/243effef66c366044cc692f439cfb9a3/448f2/smoke-test.png)


- Load Test (Teste de Carga)
  - O teste de carga se preocupa principalmente em avaliar o desempenho atual do seu sistema em termos de usuários ou solicitações simultâneas por segundo.
  - Utilizado para verificar se a aplicação está batendo as metas de desempenho.
  - As metas normalmente são definidas pelo conhecimento que se tem das médias das execuções passadas.
  - É possível certificar o atendimento dos padrões de desempenho ao fazer alterações tanto na aplicação (código) quanto na infraestrutura.
![Load Test](https://k6.io/docs/static/53c756573c738528633ed7b67a7819df/52df6/load-test.png)

- Stress Test 
  - Diferente do teste de carga que avalia o desempenho da aplicação, o teste de estresse é um tipo de teste de carga usado para determinar os limites do sistema. 
  - O objetivo deste teste é verificar a estabilidade e confiabilidade do sistema sob condições extremas e carga pesada.
  - Avalia a capacidade máxima em termos de usuários ou taxa de transferência.
  - E também como falha e quando falha.
![Stress Test](https://k6.io/docs/static/5a1571e3a4df83a907e0346e586c784f/e134c/stress-test.png)

- Soak Test (Testes de imersão)
  - Testes de imersão revela problemas de desempenho e confiabilidade decorrentes de um sistema sob pressão por um período prolongado.
  - Com um teste de imersão, você pode simular dias de tráfego em apenas algumas horas.
  - Pode ser encontrados de bugs ou memory leak, que resultam em travamento ou reinicialização após várias horas de execução.
  - Identifica exaustão tanto dos logs quanto do banco de dados
  - Certifique que os serviços externos também não vão parar
![Soak Test](https://k6.io/docs/static/d0a41ac91b107891e1fe9ef45d410e5b/deb37/soak-test.png)

- Spike Test
  - Spike Testing é feito aumentando e diminuindo repentinamente a carga nos serviços.
    - Para observar o desempenho ou o comportamento de um aplicativo sob carga alterada repentina, podendo ter baixa a 0 VU.
    - Para analisar o tempo de recuperação entre dois pontos ou picos, pois isso afeta o desempenho.
![Spike Test](https://www.ubik-ingenierie.com/wp-content/uploads/2019/01/Spike-Test.png)

