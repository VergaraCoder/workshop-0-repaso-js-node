const urlProducts="https://api.escuelajs.co/api/v1/products";

const urlUsers="https://api.escuelajs.co/api/v1/users";


const $select=document.getElementById("platzi");
const $selectFilter=document.getElementById("filter");

const $containerMis=document.querySelector(".containerMistakes");
const $container=document.querySelector(".containerProducts");
const $inputFilter=document.querySelector(".inputSearch");
const $button=document.querySelector("#search");


const object={
    electronics:2,
    plan:3,
    shoes:4,
    caps:5,
    watches:18,
    perfumes:19
}

$select.addEventListener('change',()=>{
    const value= $select.value;
    showProducts(urlProducts,value);
});


$selectFilter.addEventListener('change',()=>{
    const value= $selectFilter.value;
    showProducts2(urlProducts,value,$select.value);
    $selectFilter.value="Selecciona filtro";
});





const showProducts=(url,opcion)=>{
    fetch(url)
    .then(response=>{
        if(!response.ok){
            throw new Error("No se pudo traer los datos");
        }
        return response.json();
    })
    .then(data=>{
        showData(data,opcion)
    })
    .catch(err=>{
        $containerMis.innerHTML=err.message;
        setTimeout(()=>{
            $containerMis.innerHTML="";
        },3000);
    })
}


const showProducts2=(url,opcion,category)=>{
    fetch(url)
    .then(response=>{
        if(!response.ok){
            throw new Error("No se pudo traer los datos");
        }
        return response.json();
    })
    .then(data=>{
        filter(data,opcion,category)
    })
    .catch(err=>{
        $containerMis.innerHTML=err.message;
        setTimeout(()=>{
            $containerMis.innerHTML="";
        },3000);
    })
}

function showData(data,opcion){

    $container.innerHTML="";

    let numProducts=0;
    for(let i=0;i<data.length;i++){

        let info=data[i];
        
        if(info.category.id==object[opcion]){
            numProducts++;
            $container.innerHTML+=`
                <div class="products">
                    <div class="up">
                        <h2>${info.title}</h2>
                    </div>

                    <div class="down">
                        <h3>${info.description}</h3>
                        <h1>$ ${info.price}</h1>
                        <button>Comprar</button>
                    </div>
                </div>
            `
        }
    }
    if(numProducts==0){
        $container.innerHTML=`<h1>No se encontraron productos para esta categoria</h1>`
    }
}



function filter(data,opcion,category){

    if(opcion=="littleToBig"){
        const newData=data.sort((a,b)=>a.price - b.price);
        filterProducts(newData,category);
    }
    else if(opcion=="price"){
        $inputFilter.placeholder="Escribe el precio en especifico";
        $button.style.display="block";
        $button.addEventListener("click",()=>{

            filterPrice(data,category,$inputFilter.value);
        });
    }
    
}



const filterProducts=(data,category)=>{
    $container.innerHTML="";
    for(let i=0;i<data.length;i++){
        let info=data[i]; 
        if(info.category.id==object[category]){
            $container.innerHTML+=`
                <div class="products">
                    <div class="up">
                        <h2>${info.title}</h2>
                    </div>

                    <div class="down">
                        <h3>${info.description}</h3>
                        <h1>$ ${info.price}</h1>
                        <button>Comprar</button>
                    </div>
                </div>
            `
        }
    }
}

const filterPrice=(data,category,price)=>{
    $container.innerHTML="";
    for(let i=0;i<data.length;i++){
        let info=data[i]; 
        if(info.category.id==object[category] && info.price==parseInt(price)){
            
            $container.innerHTML+=`
                <div class="products">
                    <div class="up">
                        <h2>${info.title}</h2>
                    </div>

                    <div class="down">
                        <h3>${info.description}</h3>
                        <h1>$ ${info.price}</h1>
                        <button>Comprar</button>
                    </div>
                </div>
            `
        }
    }
}