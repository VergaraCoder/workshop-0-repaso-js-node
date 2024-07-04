const URLbase="https://jsonplaceholder.typicode.com/posts";

const showData=(url)=>{
    return new Promise((resolve,reject)=>{
    fetch(url)
    .then((response)=>{
        if(!response.ok){
            throw new Error("Hubo un error al traer los datos");
        }
        return response.json()
    })
    .then(data=>{
        showBeatiful(data);
    })
    .catch(err=>{
        const $err=document.querySelector("#error-message");
        $err.innerHTML=err.message;

        setTimeout(()=>{
            $err.innerHTML="";
        },3000);
    })
    });
}


const showBeatiful=(data)=>{
   for(let i=0;i<data.length;i++){
    console.log();
    const $containerData=document.querySelector('#post-list');

    $containerData.innerHTML+=`
        <li class="mejor">
            <a>El UserId del usuario es <strong>${data[i].userId} </strong></a> <br>
            <a>El id del usuario es <strong>${data[i].id} </strong></a> <br>
            <a>El titulo del usuario es <strong>${data[i].title}</strong></a> <br>
            <a>El cuerpo del usuario es <strong> ${data[i].body}</strong></a> <br>
        </li>
    `;
   }
}


const $button=document.getElementById('fetch-posts');

$button.addEventListener("click",()=>{
    showData(URLbase);
});

