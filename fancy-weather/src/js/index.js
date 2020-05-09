
import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import './materialize';
import './speech-recognition';


document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
});


