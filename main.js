Vue.component( 'regist-form', {
    props: ['title'],
    template: `
        <form>
            <label for="first-name">Enter your first name:</label>
            <input type="text" placeholder="Your Name" name="first-name"  required>

            <label for="last-name">Enter your last name:</label>
            <input type="text" placeholder="Your Last Name" name="last-name"  required>
            
            <label for="date-of-birth">Enter your birth date:</label>
            <input type="date" name="date-of-birth" required>


            <div>

                <label for="sex">Select sex:</label>
                
                <input type="radio" id="male" name="sex" value="male">
                <label for="male">Male</label>

                <input type="radio" id="female" name="sex" value="female">
                <label for="female">Female</label>

            </div>


            <label for="interests">Choose your interests (hold CTRL while you choose):</label>

            <select name="interests" id="interests" multiple="multiple">
                <option value="sports">Sports</option>
                <option value="books">Books</option>
                <option value="politics">Politics</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
            </select>

            <button type="submit">Register</button>
        </form>
        <p>{{ title }}</p>
        `,
    methods: {
        
    }
})
var Form = new Vue({
    el: "#form",
    template: `
        <form>
            <input v-model="newName" type="text" placeholder="Type Your Name" @keyup.enter="addUser">
            <p>New user is: {{ newName }}</p>
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
            { name: "Krzysztof" },
            { name: "Paweł" },
            { name: "Konrad" },
        ],
        newName: '',
    },
    computed: {
        usersList: function () {
            var list = [];
            for(x=0; x < this.users.length; x++) {
                list.push(' ' + this.users[x].name);
            }return 'Users registered: ' + list;
        },
    },
    methods: {
        addUser: function () {
            this.users.push({
                name: this.newName
            },);
            this.newName = '';
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