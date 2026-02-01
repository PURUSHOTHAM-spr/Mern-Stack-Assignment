fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(data => {
    const titles = data.map(post => post.title);
    console.log(titles);
})

//The Fetch API interface allows web browser to make HTTP requests to web servers.



//modern async await syntax
async function getData() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        //extract data from the response
        const data = await response.json();
        const titles = data.map(post => post.title);
        console.log(titles);
}
getData();
//---------------------------------
// JSON (JavaScript Object Notation) is a lightweight, text-based,
// language-independent data interchange format.