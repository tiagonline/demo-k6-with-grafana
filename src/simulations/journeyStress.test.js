//import journeyOndemand from "../requests/journeyOndemand.request.js";
//import journeyKafka from "../requests/journeyKafka.request.js";
import {group, sleep} from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '15s', target: 100 },
    { duration: '20s', target: 250 },
    { duration: '25s', target: 300 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
      // 90% das solicitações devem terminar em 400 ms, 95% em 800 e 99,9% em 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000']
  },
};

export default () => {
    group('Send sms by ondemand type', () => {
       // journeyOndemand();
    });

    // group('Send sms by kafka type', () => {
    //     journeyKafka();
    // });

    // group('Send sms by scheduled type', () => {
    //     journeyScheduled();
    // });

    // group('Send sms by realtime type', () => {
    //     journeyRealtime();
    // });
    sleep(1);
}