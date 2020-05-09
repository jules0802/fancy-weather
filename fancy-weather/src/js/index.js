import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import './materialize';
import './speech-recognition';


document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('select');   
    let instances = M.FormSelect.init(elems);
  });