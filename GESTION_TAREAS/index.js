
class newTask{
    constructor(id,description){
        this.id=id;
        this.description=description;
    }
    addTask(){
        localStorage.setItem(this.id,this.description);
        location.reload();
    }
}


document.addEventListener('DOMContentLoaded',()=>{

    const $button=document.getElementById('add-task');

    $button.addEventListener("click",(e)=>{

        const valueTask=document.getElementById('new-task').value;
        let count=localStorage.length;

        console.log(count);
        
        const object=new newTask(`task${count+=1}`,valueTask);
        object.addTask();

    });


    const $elementHTML=document.getElementById('task-list');
    showData($elementHTML);
   
});



function showData($HTML){
    for(let i=0; i<localStorage.length;i++){

        const data2=localStorage.key(i)
        const data=localStorage.getItem(data2);

        if(data2){
            const $button=document.createElement('BUTTON');
            const $button2=document.createElement('BUTTON');
            const $li=document.createElement('LI');
            const $input=document.createElement('INPUT');
            $input.type="checkbox";

            $li.dataset.id=data2;
            $li.dataset.task=data;
            $li.textContent=data;
            $button.textContent="eliminar";
            $button2.textContent="Actualizar";
        
            $HTML.appendChild($li);
            $li.appendChild($button);
            $li.appendChild($button2);
            $li.appendChild($input);

            $button.addEventListener("click",()=>{
                deletetaks($li);
            })

            $button2.addEventListener("click",()=>{
                updateData($li);
            });
        }
    }
}


function deletetaks($elementList){
    localStorage.removeItem($elementList.dataset.id);
    console.log($elementList.dataset.id);
    location.reload();
}

function updateData($elementList){
    const $buttonUpdate=document.getElementById('update-task');
    $buttonUpdate.style.display="block";

    const $inputWithData=document.getElementById('new-task');

    $inputWithData.value=$elementList.dataset.task;

    $buttonUpdate.addEventListener("click",()=>{
        localStorage.setItem($elementList.dataset.id,$inputWithData.value);
        location.reload();
    });
}