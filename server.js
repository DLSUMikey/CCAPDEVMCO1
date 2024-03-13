const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://gorillamonkey193:w753WrjUP7Nlcdkk@ccapdevmco.3w1lh3c.mongodb.net/');

// Account Schema
const accountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Account = mongoose.model('Account', accountSchema);



// Register Account
app.post('/register', async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        // Validate that passwords match
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        // Check if account exists
        let account = await Account.findOne({ $or: [{ email }, { username }] });
        if (account) {
            return res.status(400).send('User already exists');
        }

        // Hash password and create account
        const hashedPassword = await bcrypt.hash(password, 10);
        account = new Account({ email, username, password: hashedPassword });
        await account.save();
        console.log("New user registered: ", account);
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send('Server error');
        console.log("Error: ", err);
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        res.send('Login successful');
    } else {
        res.status(400).send('Invalid email or password');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
