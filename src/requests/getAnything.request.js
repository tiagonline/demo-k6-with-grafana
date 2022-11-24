import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export let getDuration = new Trend('1_duration');
export let getReqs = new Rate('2_reqs');
export let getSuccessRate = new Rate('3_success_rate');
export let getFailRate = new Rate('4_fail_rate');

export default function () {
  
    let res = http.get(`https://httpbin.org/get`);
  
    check(res, {
      'status is 202': (r) => r.status === 202
    });

    getDuration.add(res.timings.duration);
    getReqs.add(1);
    getSuccessRate.add(res.status < 399);
    getFailRate.add(res.status == 0 || res.status > 399);

    let durationMsg = 'Max Duration ${1000/1000}s'
    if(!check(res, {
        'max duration': (r) => r.timings.duration < 1000,
    })){
        fail(durationMsg);
    }
    
    sleep(1);

}


