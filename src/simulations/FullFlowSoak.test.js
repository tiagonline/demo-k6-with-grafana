import getAnything from "../requests/getAnything.request";
import {group, sleep} from 'k6';

export const options = {
    stages: [
      { duration: '2m', target: 400 }, // aumentar para 400 usuários
      { duration: '3h56m', target: 400 }, // ficar em 400 por ~ 4 horas
      { duration: '2m', target: 0 }, // diminuir gradativamente (opcional)
    ],
  };

export default () => {
    group('soak test', () => {
        getAnything();
    })
    sleep(1);
}