console.log("Notes");
showNotes();

// If user adds a note save it to the localStorage
let addNote = document.getElementById("addNote");
addNote.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } 
  else {
    noteObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    txt: addTxt.value
  }
  noteObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  addTxt.value = "";
  addTitle.value = "";
  // console.log(noteObj);
  showNotes();
  
});


// Funtion To Display The Notes
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `<div class=" noteCard card my-2 mx-2" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.txt}</p>
          <button  id="${index}" onClick="deleteOne(this.id)" class="btn btn-primary">Delete This</button>
        </div>
      </div>
      `;
  });

  let notesElm = document.getElementById("notes");
  if (noteObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else{
    notesElm.innerHTML = `<h4>No Notes To Show Here , Use Add Note Function From The Above Section To Add Notes.</h4>`
  }
};



// Function To Delete A Note
function deleteOne(index){
  // console.log("I am Deleting", index);


  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } 
  else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
  
}

// Search Fiture
let searchFilter = document.getElementById('searchFilter');
searchFilter.addEventListener('input',()=>{

  let intVal = searchFilter.value;

  let card = document.getElementsByClassName('noteCard')
  Array.from(card).forEach(function (e){

    let cardTxt = e.getElementsByTagName("p")[0].innerText;
    let cardTitle = e.getElementsByTagName("h5")[0].innerText;
    if(cardTxt.includes(intVal) | cardTitle.includes(intVal)){
      e.style.display ="block";
    }
    else{
     e.style.display = "none";
    }

  })
})