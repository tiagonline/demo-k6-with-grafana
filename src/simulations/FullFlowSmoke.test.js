import getAnything from "../requests/getAnything.request";
import {group, sleep} from 'k6';

export const options = {
    vus: 1, // 1 usuário em loop por 1 minuto
    duration: '1m',
  
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% das solicitações devem ser concluídas abaixo de 1,5s
    },
  };

export default () => {
    group('smoke test', () => {
        getAnything();
    })
    sleep(1);
}