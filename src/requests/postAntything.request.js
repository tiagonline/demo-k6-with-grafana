import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export let getDuration = new Trend('1_duration');
export let getReqs = new Rate('2_reqs');
export let getSuccessRate = new Rate('3_success_rate');
export let getFailRate = new Rate('4_fail_rate');

export default function () {

    let params = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer authenticationXewardsJourney'
        },
      };

    let body = JSON.stringify({
            consumerId: "3a9f62d45f54412fa69d59db42589f52",
            profileId: "5e19ebdca498f6760aa11b6a",
            customProperties: {
                login: "postman",
                data: "pwd123"
            }
    })
  
    let res = http.post(`https://api-hmg.bonuz.com/xewards-journey/journeyEvents/625daa73417fdfccb0befefe/send`, body, params);
  
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


