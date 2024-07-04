class notes{
    constructor(id,descriptionNote){
        this.id=id;
        this.descriptionNote=descriptionNote;
    }
    addNote(){
        localStorage.setItem(this.id,this.descriptionNote);
        location.reload();
    }
}

class showNotes{
    constructor(){}
    showNotesScreen($parentElement){
        for(let i=0 ; i<localStorage.length;i++){

            const data=localStorage.key(i);
            const data2=localStorage.getItem(data);

            if(data2){
              
                const $li=document.createElement('LI');
                const $button1=document.createElement('BUTTON');
                const $button2=document.createElement('BUTTON');
                const $button3=document.createElement('BUTTON');
   
                $li.dataset.id=data;       
                $li.dataset.description=data2;
   
                if($li.dataset.id.includes("special")){
                    $li.classList.toggle("hello");
                }
                $li.textContent=data2;
                $button1.textContent="Eliminar";
                $button2.textContent="Actualizar";
                $button3.textContent="marcar como importante";
   
                $parentElement.appendChild($li);
                $li.appendChild($button1)
                $li.appendChild($button2);
                $li.appendChild($button3);
               
                $button1.addEventListener("click",()=>{
                   deleteNote($li);
                });
   
                $button2.addEventListener("click",()=>{
                   updateNote($li);
                });
   
                $button3.addEventListener("click",()=>{
                   decortate($li);
                });

            }
        }
    }
}

const $buttonNote=document.getElementById('send-not');
const $inputDescription=document.getElementById('not');

$buttonNote.addEventListener("click",()=>{
    let countItems=localStorage.length;

    console.log($inputDescription.value);
    const instanceObject=new notes(`note${countItems+=1}`,$inputDescription.value);

    instanceObject.addNote();

});



document.addEventListener('DOMContentLoaded',()=>{
    const $ulElement=document.querySelector('.list');
    const show=new showNotes();
    show.showNotesScreen($ulElement);
});



function deleteNote($htmlElement){
    localStorage.removeItem($htmlElement.dataset.id);
    location.reload();
}


function updateNote($htmlElement){
    $inputDescription.value= $htmlElement.dataset.description;

    const $buttonUpdate=document.getElementById('update-not');
    $buttonUpdate.style.display="block";

    $buttonUpdate.addEventListener("click",()=>{
        localStorage.setItem($htmlElement.dataset.id,$inputDescription.value);
        location.reload();
    });
}


function decortate($liElement){
    let value=$liElement.dataset.id;

    localStorage.removeItem(value);

    $liElement.dataset.id=value+"special";

    localStorage.setItem($liElement.dataset.id,$liElement.dataset.description);

    $liElement.classList.toggle("hello");
}