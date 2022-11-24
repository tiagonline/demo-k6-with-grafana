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
  },
};

export default () => {
    group('stress test', () => {
        getAnything();
    })
    sleep(1);
}