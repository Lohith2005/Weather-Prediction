const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the login.html on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'login-demo\weather\weather 1\index.html'));

})

// Read users from JSON file
const usersFilePath = path.join(__dirname, 'users.json');
const getUsers = () => {
    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath);
        return JSON.parse(usersData);
    }
    return [];
};

// Write users to JSON file
const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register route
app.post('/register', async (req, res) => {
    console.log("Register route hit");
    const { username, password} = req.body;

    const users = getUsers();

    if (users.find(user => user.username === username)) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers(users);

    res.json({ success: true });
});

// Login route
app.post('/login', async (req, res) => {
    console.log("Login route hit");
    const { username, password } = req.body;

    const users = getUsers();

    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ success: false, message: 'Invalid username or password' });
    }

    res.json({ success: true });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});














