import getAnything from "../requests/getAnything.request";
import {group, sleep} from 'k6';

export const options = {
    stages: [
      { duration: '10s', target: 100 }, // carga baixa normal
      { duration: '1m', target: 50 },
      { duration: '10s', target: 500 }, // em 10 segundos acontece pico de 1400 usuários
      { duration: '10s', target: 5 }, // tem uma queda de uso
      { duration: '3m', target: 1400 }, // fica 3 minutos com os 1400 usuarios
      { duration: '2m', target: 250 },
      { duration: '10s', target: 1200 }, // começa a baixar a escala
      { duration: '3m', target: 100 },
      { duration: '10s', target: 0 },
    ],
  };

export default () => {
    group('spike test', () => {
        getAnything();
    })
    sleep(1);
}