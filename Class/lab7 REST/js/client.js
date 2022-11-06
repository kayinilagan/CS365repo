//This is a version of setTimeout that uses promises instead.
function delay(waitTime) {
    return new Promise((resolve, reject) => setTimeout(resolve, waitTime));
}

//Exmaple of using it:
Promise.resolve() //gives us a promise that's fufilled right away!
    .then(() => delay(1000))
    .then(() => delay(1000))

let myApp = Vue.createApp({
    data() {
        return { posts: null, users: null, title: null, body: null };
    },
    methods: {
        getUser(userId) {
            return this.users.find((user) => user.id == userId);
        },
        listResources() {
            fetch('https://jsonplaceholder.typicode.com/users/')
                .then((response) => response.json())
                .then((json) => { this.users = json; });
            fetch('https://jsonplaceholder.typicode.com/posts/')
                .then((response) => response.json())
                .then((json) => this.posts = json);
        },
        createResource() {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    this.posts.push(json);
                });
        }
    },
}).mount("#app");


