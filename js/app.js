console.log("welcome to notes app")
showNotes();

//if user add a note add it to thelocal storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addTxt  = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value="";
    console.log(notesObj);

    showNotes();
})

//function to show notes from Localstorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html+= `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index+1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
             </div>
         </div>
        `;

    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length!=0){
        notesElm.innerHTML = html;

    }
    else{
        notesElm.innerHTML = `Notes is Empty ! click add note to add`
    }
}
// funtion to delete a note
function deleteNote(index){
    console.log("Deleting "+index)
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener("input", function(){
    console.log("object");
    let inputValue = searchTxt.value.toLowerCase();
   // console.log(`input are ${inputValue}`);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
      //  console.log(cardTxt);

        if(cardTxt.includes(inputValue)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }

    })
})
