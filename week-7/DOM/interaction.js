//user interaction
//handling events
    //read element
    //attach event handler
    let element = document.querySelector('h1')
    console.log(element.textContent)
    let btn = document.querySelector('button')

    //attach event handler
    btn.addEventListener('click',()=>{
        element.textContent = "hello world"
        element.style.color = "red"
        element.style.fontSize = "5rem"
    })
    //read all elements of form
    let form = document.querySelector('form')
    let username = document.querySelector("#username")
    let password = document.querySelector("#password")
    let submitButton = document.querySelector(".btn")


    //add form submit event listner to button
    submitButton.addEventListener('click',(e)=>{
        //stop auto page reloading
        e.preventDefault()
        //read values
        let user = username.value
        let pass = password.value
        //display values
        console.log(user)
        console.log(pass)
        
    })

    //read button create child
    let createchild = document.querySelector(".create-child")
    let parent = document.querySelector(".parent")

    createchild.addEventListener('click',()=>{
        //document new para element
        let para = document.createElement("p")
        //add text content
        para.textContent = "new child"
        //add para to parent or append to parent
        parent.appendChild(para)
         
    })