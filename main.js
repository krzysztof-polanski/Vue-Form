
var Form = new Vue({
    el: "#form",
    template: `
        <form>
            <label for="name">Enter your first name:</label>
            <input v-model="newName" type="text" placeholder="Type Your Name" name="name">

            </br>

            <label for="last-name">Enter your last name:</label>
            <input v-model="newLastName" type="text" placeholder="Type Your Last Name" name="last-name">

            
            
            </br>
            
            <label for="date-of-birth">Choose your birth date:</label>
            <input v-model="newBirthday" type="date" name="date-of-birth">

            </br>

            <div>

                <label for="sex">Select sex:</label>
                
                <input v-model="newSex" type="radio" id="male" name="sex" value="male">
                <label for="male">Male</label>

                <input v-model="newSex" type="radio" id="female" name="sex" value="female">
                <label for="female">Female</label>

            </div>

            <label for="interests">Choose your interests (hold CTRL while you choose):</label>

            <select v-model="newInterests" name="interests" id="interests" multiple="multiple">
                <option value="sports">Sports</option>
                <option value="books">Books</option>
                <option value="politics">Politics</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
            </select>

            </br>

            <p v-if="newName.length">New user is: {{ newName[0] + newLastName }} </p>


            <input type="submit" v-bind:class="{ 'text-danger': newName.length === 0 }" :disabled="newName.length === 0" @click="addUser" value="Add User">

            
            


            <h2>Users registered:</h2>
            <ul v-if="users.length">
                <li v-for="user in users">
                    {{ user.name }}
                </li>
            </ul>
            <p>{{ usersList }}</p>
        </form>
    `,
    data: {
        users: [
            {
                name: "Krzysztof",
                lastName: "Polański",
                birthday: "",
                sex: "",
                interests: [],
            },
            {
                name: "Paweł",
                lastName: "Polański",
                birthday: "",
                sex: "",
                interests: [],
            },
            {
                name: "Konrad",
                lastName: "Polański",
                birthday: "",
                sex: "",
                interests: [],
            },
        ],
        newName: '',
        newLastName: '',
        newBirthday: '',
        newSex: '',
        newInterests: [],
    },
    computed: {
        usersList: function () {
            var list = [];
            function firstToUp(str){
                var firstLett = str.slice(0, 1).toUpperCase();
                var restOfStr = str.slice(1);
                return firstLett + restOfStr
            }
            for(x=0; x < this.users.length; x++) {
                list.push(' ' + this.users[x].name[0].toUpperCase() + firstToUp(this.users[x].lastName));
            }return 'Users registered: ' + list;
        },
    },
    methods: {
        addUser: function () {
            this.users.push({
                name: this.newName,
                lastName: this.newLastName,
                birthday: this.newBirthday,
                sex: this.newSex,
                interests: this.newInterests,
            },);
            this.newName = '',
            this.newLastName = '',
            this.newBirthday = '',
            this.newSex = ''
            this.newInterests = []
        }
    }
});







var app = new Vue({
    el: '#app',
    data: {
        message: "Test paragraph is working!",
        newName: ''
    },
    methods: {
    },
    computed: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('');
        },
        
    },
    components: {
        'NewUserForm': Form
    }
})