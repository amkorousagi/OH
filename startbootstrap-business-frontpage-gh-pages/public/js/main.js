import { CountUp } from './countUp.min.js';

window.onload = function() {
  var countUp = new CountUp('abc', 2000);
  console.log("count up!")
  countUp.start();
}