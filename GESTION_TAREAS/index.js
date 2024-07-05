/*Lo unico que copie de nicolas fue el html inicial de resto nada mas*/



class newTask{   //Creamos una clase encargada de darle un estado inicial de sus instancias(una copia de la clase o ejemplar );
    constructor(id,description){   //Declaramos el metodo constructor que se encarga de darle ciertas propiedades al objeto instanciado
        this.id=id;  //Estas caracteristicas son un id
        this.description=description;  // y una descripcion de la nueva tarea
    }
    addTask(){  //creamos un metodo(funcion dentro de clase) para realizar un comportamiento y este es agregar la tarea el local storage
        localStorage.setItem(this.id,this.description);  // le pasamos como parametro el id y la descripcion dados en el objeto que fue instanciado en ese momento
        location.reload();  // recargamos la pagina 
    }
}


document.addEventListener('DOMContentLoaded',()=>{  // Damos un evento al documento para que despues de cargar todos los elementos del mismo hagamos todo lo siguiente

    const $button=document.getElementById('add-task');  // Seleccionamos un boton que se encargara de añadir una nueva tarea

    $button.addEventListener("click",(e)=>{  //damos un evento de click al boton anterior 

        const valueTask=document.getElementById('new-task').value;  // Seleccionamos el input que contiene la descripcion de la tarea y extraemos su valor
        let count=localStorage.length;  // Contamos cuantos elementos tiene actualmente el local Storage

        console.log(count);  // pequeño console que use para verificar 
        
        const object=new newTask(`task${count+=1}`,valueTask);  // instanciamos un nuevo objeto de la clase creada al incio del fichero y pasamos como parametro la palabra task junto con el numero total de elementos que hay en el localStorage sumandole 1 , y como valor de esa clave el valor del input que contenia la descripcion de la tarea
        object.addTask(); // una vez instanciado un objeto de la clase activamos el metodo para añadir esa tarea al localStorage

    });


    const $elementHTML=document.getElementById('task-list');  // seleccionamos un elemento UL que es quien contendra todas las tareas que hay en el local storage
    showData($elementHTML);  // llamamos a una funcion encargada de dibujar dichas tareas subidas en el localStorage y pasamos como parametro el UL($elementHTML)
   
});



function showData($HTML){  // aca Creamos la funcion para dibujar los elementos en el html y le pasamos como parametro un elmento html que en este caso es un UL
    for(let i=0; i<localStorage.length;i++){   //inicamos una iteracion de elementos tomando para el nuemro de iteraciones el total de las tareas que existen en el localStorage

        const data2=localStorage.key(i) // visualizamos que clave hay por ejemplo en la posicion 0 en el local storage 
        const data=localStorage.getItem(data2); // Esa clave data la usamos para extraer el valor de ese elemento 

        if(data2){  // En el caso de que en cierta posicion si exista una clave haremos lo siguiente
            const $button=document.createElement('BUTTON'); // creamos un elemento html en este caso un boton para eliminar
            const $button2=document.createElement('BUTTON'); // creamos otro boton para actualizar 
            const $li=document.createElement('LI');   //creamos un elemento de lista 

            $li.dataset.id=data2;  // Aca establecer un atributo data- para que el elemento LI contenga cierta infromacion de manera interna para posterior uso en este caso el metado dato se llama id (data-id)
            $li.dataset.task=data; // Aca establecemos otro metadato para en este caso almacenar la descripcion de la tarea (data-task)
            $li.textContent=data; //Establecemos como contenido visual el valor de data en el momento
            $button.textContent="eliminar"; // Al primer boton le damos como texto eliminar
            $button2.textContent="Actualizar";// Al segundo boton le damos como valor actualizar
        
            $HTML.appendChild($li);  //El elemento HTML de parametro que sera un UL sera el padre del elemento LI
            $li.appendChild($button); //El elemento LI sera el padre del primer boton creado(boton de eliminar)
            $li.appendChild($button2); //El elemento LI sera el padre del segundo boton creado(boton de actualizar)

            $button.addEventListener("click",()=>{  // para el primer boton(Boton de eliminar) le damos un evento que cuando se activa
                deletetaks($li);//llamamos a una funcion encargada eliminar la tarea y pasamos como parametro el elemento li que recordemos que que tiene los metadatos internos (el id, y la descripcion)
            })

            $button2.addEventListener("click",()=>{  // Al segundo boton(Boton de actualizar) le damos como un evento tambien
                updateData($li); // llamamos una funcion encargada de realizar la actualizacion de una tarea en especifico
            });
        }
    }
}


function deletetaks($elementList){  //creamos la funcion encargada de eliminar una tarea y como parametro el elemento LI(Que es respresentado en la funcion como $elementList)
    localStorage.removeItem($elementList.dataset.id);  //En el local Storage hacemos activamos en metodo removeItem y como parametro le pasamos el id(o la clave) de un cierto valor , y recordemos que en $elementList tiene 2 metadatos y uno de esos es el id (o la clave) del mismo
    location.reload(); // recargamos la pagina para que la funcion que dibuja tanbien se actualice y quite de la pagina la tarea eliminada
}


function updateData($elementList){  // funcion encargada de actualizar una tarea en especifico
    const $buttonUpdate=document.getElementById('update-task'); // Seleccionamos otro boton 
    $buttonUpdate.style.display="block"; // Este boton incialmente estaba oculto por cual al momento de llmar esta funcion estara a la vista

    const $inputWithData=document.getElementById('new-task');  // seleccionamos el input que contendra la descripcion actualizada de la tarea 
 
    $inputWithData.value=$elementList.dataset.task;  //Al input le damos un valor que sea la descripcion y que esta descripcion esta en el metadato interno de($elementList) para que el usuario vea claramente que parte de la descripcion desea actualizar.
 
    $buttonUpdate.addEventListener("click",()=>{ // creamos un evento de click para el boton que antes estaba oculto pero que ahora es visible
        localStorage.setItem($elementList.dataset.id,$inputWithData.value); // y cuando se le click cogemos el local Storage y reescribimos el dato que tiene la misma clave ($elementList.dataset.id) pero con el nuevo valor ($inputWithData.value)
        location.reload(); // recargamos la pagina para que visualmente tambien se actualice
    });
}