// Vue.component('button-to-click', {
//     data: function(){
//         return{
//             count: 0
//         }
//     },
//     template: '<button @click="count++">{{ count }}</button>'
// });

// Vue.component('blog-post', {
//     props: ['title'],
//     template: '<h2>{{ title }}</h2>'
// });


// Vue.component('usersList1', {
const UsersList = {
    template: 
        `
        <div>
        <p>Registered users:</p>
        <ol v-if="list.length">
            <template v-for="user in list">
                <li :key="user.id">
                    <ul>
                        <li><strong>Id:</strong> {{ user.id }}</li>
                        <li><strong>Name:</strong> {{ user.name }}</li>
                        <li><strong>Last Name:</strong> {{ user.lastName }}</li>
                        <li><strong>Born on:</strong> {{ user.birthday }}</li>
                        <li><strong>Sex:</strong> {{ user.sex }}</li>
                        <li><strong>Likes:</strong> {{ user.interests }}</li>
                    </ul>
                </li>
            </template>
        </ol>
        </div>
        `,
    props: ['list']
};

// Vue.component('errors-list', {
const ErrorsList = {
    template: `
        <p v-if="error.length">
        <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in error">{{ error }}</li>
            </ul>
        </p>`,
    props: ['error']
};

// Vue.component('registerForm', {
const RegisterForm = {
    components: {
        'errors-list': ErrorsList
    },
    template: `
        <div>
            <form @submit.prevent @submit="formValidate" action="#" method="post">

                
                <errors-list :error='errors' />

                <label for="newName">Enter your first name:</label>
                <input v-model="newUser.newName" type="text" placeholder="Type Your Name" name="newName">

                </br>

                <label for="newLastName">Enter your last name:</label>
                <input v-model="newUser.newLastName" type="text" placeholder="Type Your Last Name" name="newLastName">

                
                
                </br>
                
                <label for="newBirthday">Choose your birth date:</label>
                <input v-model="newUser.newBirthday" type="date" name="newBirthday" max="{ new Date() }">

                </br>

                <div>

                    <label for="newSex">Select sex:</label>
                    
                    <input v-model="newUser.newSex" type="radio" id="male" name="newSex" value="Male">
                    <label for="male">Male</label>

                    <input v-model="newUser.newSex" type="radio" id="female" name="newSex" value="Female">
                    <label for="female">Female</label>

                </div>

                <label for="newInterests">Choose your interests (hold CTRL while you choose):</label>

                <select v-model="newUser.newInterests" name="newInterests" id="interests" multiple>
                    <option value="sports">Sports</option>
                    <option value="books">Books</option>
                    <option value="politics">Politics</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                </select>

                </br>

                
                
                <input type="submit" v-bind:class="{ 'text-danger': !newUser.newName }" value="Add User">
            </form>


        </div>        
            
            `,
            //wycięte na razie
            // <p v-if="newName">New user is: {{ newName[0] + newLastName }} </p>
    props: [''],
    data: function() {
        return {
            newUser: {
                newId: 4,
                newName: null,
                newLastName: null,
                newBirthday: null,
                newSex: null,
                newInterests: [],
            },
            errors: [],
        };
    },
    computed: {
    },
    methods: {
        addUserNew() {
            this.$emit('add-user-new', this.newUser);
        },
        clearForm() {
            this.newUser.newId++;
            this.newUser.newName = null;
            this.newUser.newLastName = null;
            this.newUser.newBirthday = null;
            this.newUser.newSex = null;
            this.newUser.newInterests = [];
            this.errors = [];
        },
        formValidate(e) {
            
            //dzisiejsza data do walidacji inputa z datą
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            function twoCharsDate(x){
                if (x<10){
                    return "0" + x;
                }else {
                    return x;
                }
            };
            let today = year + "-" + twoCharsDate(month) + "-" + twoCharsDate(day);
            //właściwa walidacja

            if (this.newUser.newName && this.newUser.newLastName && this.newUser.newBirthday && this.newUser.newBirthday <= today && this.newUser.newBirthday.split("-")[0] <= year && this.newUser.newSex && this.newUser.newInterests.length) {
                this.addUserNew();
                this.clearForm();
                return true;
                // this.errors = [];
            }this.errors = [];
            if (!this.newUser.newName) {
                this.errors.push('We really need your name. Because of...reasons.');
            }
            if (!this.newUser.newLastName) {
                this.errors.push('We really need your last name. Because of...reasons.');
            }
            if (!this.newUser.newBirthday) {
                this.errors.push('We really need now when you were born. Because of...reasons.');
            }
            if (this.newUser.newBirthday > today || this.newUser.newBirthday.split("-")[0] > year) {
                this.errors.push('Are you even born yet? You need to be at least 0 to join us :/');
            }
            if (!this.newUser.newSex) {
                this.errors.push('If you\'re not sure about your sex, you shouldn\'t be here...');
            }
            if (!this.newUser.newInterests.length) {
                this.errors.push('You do have some interests, don\'t you? Just pick already!');
            }
            e.preventDefault();
            // this.clearForm();
        }
    }
};


// const Form = { template: '<div>form</div>' }
// const List = { template: '<div>list</div>' }

const routes = [
    { path: '/form', component: RegisterForm },
    { path: '/list', component: UsersList }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    // el: '#app',
    components: {
        'register-form': RegisterForm,
        'users-list': UsersList
    },
    data:{
        // message: "Test paragraph is working!",
        users: [
            {
                id: 1,
                name: "Krzysztof",
                lastName: "Polański",
                birthday: "",
                sex: "",
                interests: [],
            },
            {
                id: 2,
                name: "Paweł",
                lastName: "Polański",
                birthday: "",
                sex: "",
                interests: [],
            },
            {
                id: 3,
                name: "Konrad",
                lastName: "Polański",
                birthday: "",
                sex: "",
                interests: [],
            },
        ],
    },
    methods: {
        updateList(nU) {
            // this.users1.push(id);
            this.users.push({
                id: nU.newId,
                name: nU.newName,
                lastName: nU.newLastName,
                birthday: nU.newBirthday,
                sex: nU.newSex,
                interests: nU.newInterests,
            });
        },
    }
    // computed: {
    //     reversedMessage: function() {
    //         return this.message.split('').reverse().join('');
    //     }
    // },
    
}).$mount('#app')


// Vue Router - testujemy:


// const Form = { template: '<div>form</div>' }
// const List = { template: '<div>list</div>' }



// const routes = [
//     { path: '/form', component: Form },
//     { path: '/list', component: List }
// ]

// const router = new VueRouter({
//     routes
// })

// const Rout = new Vue({
//     router
// }).$mount('#rout')