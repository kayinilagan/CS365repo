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
        return { posts: null, users: null, title: null, body: null, waitingOnPost: false };
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
                    title: this.title,
                    body: this.body,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then((json) => {
                    console.log(json);
                    this.posts.push(json);
                    this.title = null;
                    this.body = null;
                }).finally(() => {
                    this.waitingOnPost = false;
                })
            this.waitingOnPost = true;
        },
        updateResource(postID) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + postID, {
                method: 'PUT',
                body: JSON.stringify({
                    id: postID,
                    title: 'foo',
                    body: 'bar',
                    userId: postID,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then((json) => {
                    let i = this.posts.findIndex(post => post.id == json.id);
                    if (i == -1) throw new Error("Couldn't find post index " + i);
                    this.posts[i] = json;
                });

        },
        patchResource(postID) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + postID, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: 'foo',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then((json) => {
                    let i = this.posts.findIndex(post => post.id == json.id);
                    if (i == -1) throw new Error("Couldn't find post index " + i);
                    this.posts[i] = json;
                });

        },
        deleteResource(postID) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + postID, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then(() => {
                    let i = this.posts.findIndex(post => post.id == postID);
                    if (i == -1) throw new Error("Couldn't find post index " + i);
                    this.posts.splice(i, 1);
                });
        }
    },
}).mount("#app");


