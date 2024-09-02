const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Charan_sai:darling_242726@cluster0.tr74xjt.mongodb.net/Contact_Form', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Form = mongoose.model('Form', FormSchema);

app.post('/submit-form', async (req, res) => {
    console.log("Received form submission:", req.body);
    const { name, email, message } = req.body;

    try {
        const newForm = new Form({ name, email, message });
        await newForm.save();

        res.status(201).json({ success: true, message: 'Form data saved successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

app.listen(4000,()=>console.log("Server is running at 4000"));
