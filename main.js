Vue.component('button-to-click', {
    data: function(){
        return{
            count: 0
        }
    },
    template: '<button @click="count++">{{ count }}</button>'
});

Vue.component('blog-post', {
    props: ['title'],
    template: '<h2>{{ title }}</h2>'
});


Vue.component('users-list1', {
    template: 
        `
        <div>
        <p>Registered users:</p>
        <ol v-if="list.length">
            <template v-for="user in list" :key="user.id">
                <li>
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
});

Vue.component('errors-list1', {
    template: `
        <p v-if="error.length">
        <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in error">{{ error }}</li>
            </ul>
        </p>`,
    props: ['error']
});

Vue.component('register-form', {
    template: `
        <div>
            <form @submit.prevent @submit="formValidate" action="#" method="post">

                
                <errors-list1 :error='errors' />

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
            // users: [
            //     {
            //         id: 1,
            //         name: "Krzysztof",
            //         lastName: "Polański",
            //         birthday: "",
            //         sex: "",
            //         interests: [],
            //     },
            //     {
            //         id: 2,
            //         name: "Paweł",
            //         lastName: "Polański",
            //         birthday: "",
            //         sex: "",
            //         interests: [],
            //     },
            //     {
            //         id: 3,
            //         name: "Konrad",
            //         lastName: "Polański",
            //         birthday: "",
            //         sex: "",
            //         interests: [],
            //     },
            // ],
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
        // usersList: function() {
        //     let list = [];
        //     function firstToUp(str){
        //         let firstLett = str.slice(0, 1).toUpperCase();
        //         let restOfStr = str.slice(1);
        //         return firstLett + restOfStr
        //     }
        //     for(x=0; x < this.users.length; x++) {
        //         list.push(' ' + this.users[x].name[0].toUpperCase() + firstToUp(this.users[x].lastName));
        //     }return 'Users registered: ' + list;
        // },
    },
    methods: {
        // addUser() {
        //     this.users.push({
        //         id: this.newUser.newId++,
        //         name: this.newUser.newName,
        //         lastName: this.newUser.newLastName,
        //         birthday: this.newUser.newBirthday,
        //         sex: this.newUser.newSex,
        //         interests: this.newUser.newInterests,
        //     },);
        //     this.newUser.newName = null;
        //     this.newUser.newLastName = null;
        //     this.newUser.newBirthday = null;
        //     this.newUser.newSex = null;
        //     this.newUser.newInterests = []
        // },
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
            }
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
});




var app = new Vue({
    el: '#app',
    data:{
        message: "Test paragraph is working!",
        // users1: [
        //     {
        //         newId: 1,
        //         newName: "Krzysztof",
        //         newLastName: "Polański",
        //         newBirthday: "",
        //         newSex: "",
        //         newInterests: [],
        //     },
        //     {
        //         newId: 2,
        //         newName: "Paweł",
        //         newLastName: "Polański",
        //         newBirthday: "",
        //         newSex: "",
        //         newInterests: [],
        //     },
        //     {
        //         newId: 3,
        //         newName: "Konrad",
        //         newLastName: "Polański",
        //         newBirthday: "",
        //         newSex: "",
        //         newInterests: [],
        //     },
        // ],
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
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('');
        },
        
    },
    // components: {
    //     'NewUserForm': Form
    // }
})








// var Form = new Vue({
//     el: "#form",
//     template: `
//         <form>
//             <label for="name">Enter your first name:</label>
//             <input v-model="newName" type="text" placeholder="Type Your Name" name="name">

//             </br>

//             <label for="last-name">Enter your last name:</label>
//             <input v-model="newLastName" type="text" placeholder="Type Your Last Name" name="last-name">

            
            
//             </br>
            
//             <label for="date-of-birth">Choose your birth date:</label>
//             <input v-model="newBirthday" type="date" name="date-of-birth">

//             </br>

//             <div>

//                 <label for="sex">Select sex:</label>
                
//                 <input v-model="newSex" type="radio" id="male" name="sex" value="Male">
//                 <label for="male">Male</label>

//                 <input v-model="newSex" type="radio" id="female" name="sex" value="Female">
//                 <label for="female">Female</label>

//             </div>

//             <label for="interests">Choose your interests (hold CTRL while you choose):</label>

//             <select v-model="newInterests" name="interests" id="interests" multiple>
//                 <option value="sports">Sports</option>
//                 <option value="books">Books</option>
//                 <option value="politics">Politics</option>
//                 <option value="travel">Travel</option>
//                 <option value="food">Food</option>
//             </select>

//             </br>

//             <p v-if="newName.length">New user is: {{ newName[0] + newLastName }} </p>


//             <input type="submit" v-bind:class="{ 'text-danger': newName.length === 0 }" :disabled="newName.length === 0" @click="addUser" value="Add User">

//             <ol>
//                 <template v-for="user in users" :key="user.id">
//                     <li>
//                         <ul>
//                             <li>{{ user.name }}</li>
//                             <li>{{ user.lastName }}</li>
//                             <li>{{ user.sex }}</li>
//                         </ul>
//                     </li>
//                 </template>
//             </ol>

            
//             <p v-if="users.length">{{ usersList }}</p>
//         </form>
//     `,
//     data: {
//         users: [
//             {
//                 id: 1,
//                 name: "Krzysztof",
//                 lastName: "Polański",
//                 birthday: "",
//                 sex: "",
//                 interests: [],
//             },
//             {
//                 id: 2,
//                 name: "Paweł",
//                 lastName: "Polański",
//                 birthday: "",
//                 sex: "",
//                 interests: [],
//             },
//             {
//                 id: 3,
//                 name: "Konrad",
//                 lastName: "Polański",
//                 birthday: "",
//                 sex: "",
//                 interests: [],
//             },
//         ],
//         newId: 4,
//         newName: '',
//         newLastName: '',
//         newBirthday: '',
//         newSex: '',
//         newInterests: [],
//     },
//     computed: {
//         usersList: function() {
//             var list = [];
//             function firstToUp(str){
//                 var firstLett = str.slice(0, 1).toUpperCase();
//                 var restOfStr = str.slice(1);
//                 return firstLett + restOfStr
//             }
//             for(x=0; x < this.users.length; x++) {
//                 list.push(' ' + this.users[x].name[0].toUpperCase() + firstToUp(this.users[x].lastName));
//             }return 'Users registered: ' + list;
//         },
//     },
//     methods: {
//         addUser: function() {
//             this.users.push({
//                 id: this.newId++,
//                 name: this.newName,
//                 lastName: this.newLastName,
//                 birthday: this.newBirthday,
//                 sex: this.newSex,
//                 interests: this.newInterests,
//             },);
//             this.newName = '';
//             this.newLastName = '';
//             this.newBirthday = '';
//             this.newSex = '';
//             this.newInterests = []
//         }
//     }
// });
