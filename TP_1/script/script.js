const addButton = document.querySelector('.addButton');
const input     = document.querySelector('.input');
const container = document.querySelector('.container');
const clearbtn = document.querySelector('.clearbtn');
const searchBar = document.getElementById('search');

let ELEVE_LIST = ( localStorage.getItem( 'student' ) != undefined ) ?
  JSON.parse( localStorage.getItem( 'student' ) ) : [];

class Caracteristiques {
  constructor(student) {
    this.createDiv(student);
  }

  createDiv(student) {
    let input = document.createElement('input');
    input.value = student.name;
    input.disabled = true;
    input.classList.add('cara_input');
    input.type = "text";

    let itemBox = document.createElement('div');
    itemBox.classList.add('Caracteristiques');

    let editButton = document.createElement('button');
    editButton.innerHTML = '<i class="far fa-edit"></i>';
    editButton.classList.add('editButton');

    let removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash-restore-alt"></i>';
    removeButton.classList.add('removeButton');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = student.checked;
    if(student.checked){
      itemBox.classList.add("Checked")
    }
    

    container.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(checkBox);
    itemBox.appendChild(editButton);
    itemBox.appendChild(removeButton);

    editButton.addEventListener('click', () => this.edit(input, student));

    removeButton.addEventListener('click', () => this.remove(itemBox, student));
    
    checkBox.addEventListener('click', () => {
      itemBox.classList.toggle('Checked')
      student.checked = true;
      localStorage.setItem( 'student', JSON.stringify( ELEVE_LIST ) );
    })
  }

  edit(input, student) {
    input.disabled = !input.disabled;
    if (input.disabled){
      student.name = input.value;
      localStorage.setItem( 'student', JSON.stringify( ELEVE_LIST ) );
    }
  }

  remove(Caracteristiques, student) {
    container.removeChild(Caracteristiques);
    ELEVE_LIST = ELEVE_LIST.filter(s => s != student);
    localStorage.setItem( 'student', JSON.stringify( ELEVE_LIST ) );
  }

}

function add( value ) {
  if ( value != "" ) {
    const caracteres = {
      name : value.trim(),
      checked : false,
    }

    new Caracteristiques( caracteres );
    ELEVE_LIST.push(caracteres );
    localStorage.setItem( 'student', JSON.stringify( ELEVE_LIST ) );
  }
}

function init( list ) {
  container.innerHTML = "";
  list.forEach( studentElement => new Caracteristiques( studentElement ) );
}

addButton.addEventListener( 'click', () => {
  add( input.value );
  input.value = '';
} );

// Permet d'utiliser la touche ' ENTREE ' du clavier

window.addEventListener( 'keydown', ( e ) => {
  if ( e.which == 13 ) {
    add( input.value );
    input.value = '';
  }
  
} )

searchBar.addEventListener('input', (e) => {
  const caractereFilter = ELEVE_LIST.filter(eleve => {
    const nameCheck = eleve.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) != -1;
    const etatCheck = e.target.value  == "checked" && eleve.checked; 
    return nameCheck || etatCheck;
  });
  init(caractereFilter);
});

// Permet de clear le local storage

clearbtn.addEventListener( 'click', function () {
  localStorage.clear( 'student' );
  ELEVE_LIST = [];
  alert('local storage cleared');
} );


init( ELEVE_LIST );