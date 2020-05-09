import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import './materialize.js';
import './speech-recognition';


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });