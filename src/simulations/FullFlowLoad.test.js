import getAnything from "../requests/getAnything.request";
import {group, sleep} from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 60 }, // simula o aumento do tráfego de 1 a 60 usuários em 5 minutos
    { duration: '10m', target: 60 }, // fica em 60 usuários por 10 minutos
    { duration: '3m', target: 100 }, // aumenta para 100 usuários em 3 minutos (início do horário de pico)
    { duration: '2m', target: 100 }, // fica em 100 usuários por um curto período de tempo (horário de pico)
    { duration: '3m', target: 60 }, // redução para 60 usuários em 3 minutos (termina o horário de pico)
    { duration: '10m', target: 60 }, // continua em 60 por mais 10 minutos
    { duration: '5m', target: 0 }, // redução para 0 usuários
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% das solicitações devem ser concluídas abaixo de 1,5s
  },
};

export default () => {
    group('load test', () => {
        getAnything();
    })
    sleep(1);
}