import getAnything from "../requests/getAnything.request";
import {group, sleep} from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 }, // simula o aumento do tráfego de 50 usuários em 30 segundos
    { duration: '1m', target: 300 }, // fica em 300 usuários por 1 minuto
    { duration: '30s', target: 0 }, // redução para 0 usuários nos últimos 30 segundos
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% das solicitações devem ser concluídas abaixo de 1,5s
    'logged in successfully': ['p(99)<1500'], // 99% das solicitações devem ser concluídas abaixo de 1,5s
    'http_req_failed': ['rate<0.01'], // erros http devem ser menores que 1%

          // Outro formato de configuração do thresholds
          // 90% das solicitações devem terminar em 400 ms, 95% em 800 e 99,9% em 2s.
          //http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000']
  },
};

export default () => {
    group('stress test', () => {
        getAnything();
    })
    sleep(1);
}