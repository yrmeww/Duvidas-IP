function getQuestion(){

    let http = new XMLHttpRequest();
    http.open("POST", "/getQuestion", true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send('protocol='+document.getElementById("protocol").value);

    http.onload = function() {
        //Parses the response
        let obj = JSON.parse(http.responseText)

        //Question was found
        if(obj.res){
            loadBox(obj.question);
        //Question was not found
        }else
            alert("Questão não encontrada!");

    }
}


//Gets question on Enter
let protocolInput = document.getElementById("protocol")
protocolInput.addEventListener("keyup", function(e){
    if(e.keyCode== 13){
        e.preventDefault();
        getQuestion();
    }
})


const card = document.getElementById("fileCard");
const search = document.getElementById("searchDiv");
const nav = document.getElementById("navBar");

//Loads the card with the question info
function loadBox(qs){

    setText("protocoloText", qs.id);
    setText("titulo", qs.titulo);
    setText("listaEx", "L"+(qs.lista).padStart(2,'0')+"EX"+(qs.ex).padStart(2,'0'));
    setText("nomeRA", qs.nome +" ("+qs.ra+")");
    setText("duvida",qs.duvida);

    if(qs.monitor)
        setText("monitor", "Dúvida respondida por " + qs.monitor);
    else
        document.getElementById("monitor").innerText = "";

    if(qs.comentario){
        document.getElementById("comentario").style.opacity = "1"
        setText("comentario","Comentário: \n"+qs.comentario);
    }
    else
        document.getElementById("comentario").style.opacity = "0"

    let status = document.getElementById("status");
    switch(qs.status){
        case 0:
            status.innerText = "Não respondida"
            status.style.color = "#DB4437"
            break;
        case 1:
            status.innerText = "Respondida"
            status.style.color = "#0F9D58"
            break;
        default:
            status.style.display = "none"
    }

    nav.style.opacity = '0';
    search.style.opacity = '0';
    card.style.display = "block"
}

function setText(id, text){
    document.getElementById(id).innerText = text;
}

//Removes the card with the question info
function removeBox(){
    card.style.display = "none"
    nav.style.opacity = '1';
    search.style.opacity = '1';
}