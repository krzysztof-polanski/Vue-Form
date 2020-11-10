// Material Select Initialization



const UsersList = {
    template: 
        `
        <div v-if='list.length'>
        <h3>Registered users:</h3>
        <ol>
            <template v-for="user in list">
                <li :key="user.id">
                    <ul>
                        <li><strong>Name:</strong> {{ user.name }}</li>
                        <li><strong>Last Name:</strong> {{ user.lastName }}</li>
                        <li><strong>Born on:</strong> {{ dateVisual(user.birthday) }}</li>
                        <li><strong>Sex:</strong> {{ user.sex }}</li>
                        <li>Likes {{ interestsVisual(user.interests) }}</li>
                    </ul>
                </li>
            </template>
        </ol>
        </div>
        `,
    props: ['list'],
    methods: {
        
        dateVisual(str){

            let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let arr = str.split("-");

            for( j = 0; j < monthNames.length; j++) {
                if (arr[1]==(j+1)) {
                    console.log(arr[1] + "=" + (j+1));
                    console.log(monthNames[j]);
                    return (isZeroFirst(arr[2]) + " " + monthNames[j] + " " + arr[0]);
                }
            }

            function isZeroFirst(n) {
                if (n[0] == 0){
                    return n[1]
                }else {
                    return n
                }
            }
        },
        interestsVisual(arr){
            console.log(arr);
            let sentence = "";
            for(e = 0; e < arr.length - 2; e++){
                sentence += (arr[e] + ", ")
            }if (arr.length === 1){
                return sentence + arr[0] + "."
            }else{
                return sentence + arr[arr.length - 2] + " and " + arr[arr.length - 1] + "."
            }
        }
    }
};


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


const RegisterForm = {
    components: {
        'errors-list': ErrorsList
    },
    template: `
        <div>
            <form @submit.prevent @submit="formValidate" action="#" method="post">

                
                <errors-list class="errors" :error='errors' />

                <div>
                    <label for="newName">Enter your first name:</label>
                    <input v-model="newUser.newName" type="text" placeholder="Type Your Name" name="newName">
    
                    </br>
    
                    <label for="newLastName">Enter your last name:</label>
                    <input v-model="newUser.newLastName" type="text" placeholder="Type Your Last Name" name="newLastName">
    
                    
                    
                    </br>
                    
                    <label for="newBirthday">Choose your birth date:</label>
                    <input v-model="newUser.newBirthday" type="date" name="newBirthday" max="{ new Date() }" min="1899-01-01">
                </div>


                <div>
                    <label for="newSex">Select sex:</label>
                    <div class="sex-choice">
    
                        
                        <div class="sex-choice-el">
                            <input v-model="newUser.newSex" type="radio" id="female" name="newSex" value="Female">
                            <label class="radio-label" for="female">Female</label>
                        </div>
    
                        <div class="sex-choice-el">
                            <input v-model="newUser.newSex" type="radio" id="male" name="newSex" value="Male">
                            <label class="radio-label" for="male">Male</label>
                        </div>
    
                    </div>
                </div>

                <div class="interests">
                    <label for="newInterests">Choose your interests (hold CTRL while you choose):</label>
                    
                    
    
                    <select v-model="newUser.newInterests" name="newInterests" id="interests-list" multiple>
                        <option value="sports">Sports</option>
                        <option value="books">Books</option>
                        <option value="politics">Politics</option>
                        <option value="travels">Travels</option>
                        <option value="food">Food</option>
                    </select>
                </div>

                

                
                
                <div><input type="submit" v-bind:class="{ 'submit-ready': newUser.newName && newUser.newLastName && newUser.newBirthday && newUser.newSex && newUser.newInterests.length }" value="Add User"></div>
            </form>


        </div>        
            
            `,
    props: [''],
    data: function() {
        return {
            newUser: {
                newId: 1,
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
            this.newUser.newId += 1;
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
                this.errors.push('If you\'re not sure about your sex, you should visit the specialist first...');
            }
            if (!this.newUser.newInterests.length) {
                this.errors.push('You do have some interests, don\'t you? Just pick already!');
            }
            e.preventDefault();
        }
    }
};


const routes = [
    { path: '/form', component: RegisterForm },
    { path: '/list', component: UsersList }
]

const router = new VueRouter({
    routes: [
        { path: '/form', component: RegisterForm },
        { path: '/list', component: UsersList }
    ]
})



const app = new Vue({
    router,
    components: {
        'register-form': RegisterForm,
        'users-list': UsersList
    },
    data: function(){
        return {
            users: [
            ],
        }
    },
    props: ['users.newId'],
    methods: {
        updateList(nU) {
            this.users.push({
                id: nU.newId,
                name: nU.newName,
                lastName: nU.newLastName,
                birthday: nU.newBirthday,
                sex: nU.newSex,
                interests: nU.newInterests,
            });
        }
    }
}).$mount('#app')