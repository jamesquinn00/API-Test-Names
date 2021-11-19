const form1 = document.getElementById("form1")
const form2 = document.getElementById("form2")
const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")

async function loadNames(){
    const section = document.querySelector("section");
    try{
        let response = await fetch(`http://localhost:3000/names`);
        response = await response.json();
        let arrayLength = await response.length;
        for(const element of response){
            section.appendChild(nameDisplay(element))
        }
        return arrayLength
    } catch(err){
        console.log(err)
    }
}

loadNames()

function nameDisplay(name){
    const newUl = document.createElement("ul");
    for(const x in name){
        const newLi = document.createElement("li");
        newLi.textContent = x + ": " + name[x];
        newUl.appendChild(newLi); 
    }
    return newUl
}

form1.addEventListener("submit", e=>{
    e.preventDefault();
    const form1Data = new FormData(form1);
    const entries = form1Data.entries();
    const data = Object.fromEntries(entries);
    // call loadNames (which returns current array length)
    // use array length to get nextId value then call send function
    loadNames().then(a => {
        const newNameId = a + 1;
        send(data,newNameId)})
    }
)

function send(e,newId) {
    const nameData = {
        id: newId,
        fname: e.fname,
        sname: e.sname,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(nameData),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("http://localhost:3000/names", options)
        .then(r => r.json())
        .catch(console.warn);
    location.reload();
}

form2.addEventListener("submit", e=>{
    e.preventDefault();
    const form2Data = new FormData(form2);
    const entries = form2Data.entries();
    const data = Object.fromEntries(entries);
    // console.log(typeof(data.idDelete))
    getDeleteId(data,data.idDelete)
})

async function getDeleteId(e,delId) {
    try{
        let response = await fetch(`http://localhost:3000/names/${delId}`);
        response = await response.json();
        const nameData = {
            id: delId,
            fname: response.fname,
            sname: response.sname,
        };

        const options = {
            method: "DELETE",
            body: JSON.stringify(nameData),
            headers: { "Content-Type": "application/json" }
        };
        deleteElement(nameData, options, delId)
    }catch(err){
        console.log(err)
    }
}    

async function deleteElement(data, method, id){
        console.log(data)
        try{
            let response = await fetch(`http://localhost:3000/names/${id}`, method)
            response = await response.json();
            // .then(console.log("REACHED URL SUCCESS"))
            console.log(response)
        } catch(err){
            console.log("REACHED ERROR HERE")
            console.log(err)
        }
}
