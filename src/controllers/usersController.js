// src/controllers/usersController.js
const { generateSHA1Hash } = require('../utils/hashUtils');
const { User, Wallet } = require('../../db/models'); // Sequelize User model

exports.createUser = async(req, res) => {
    // Add user creation logic here
    try {
        const { name, phone, email, password, passport } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !password || !passport) {
            return res.status(400).json({ message: 'All fields are required',  status:'failed' });
        }

        // Check if email already exists
        try {
            // Find user by email
            const user = await User.findOne({ where: { email } });
    
            if (user) {
                return res.status(400).json({ message: 'Email already registered', status:'failed' });
            }
        }catch(errori){
            return res.status(400).json({ message: 'Error occured in registration', error:errori, status:'failed' });
        }  
        // Hash the password
        const hashedPassword = generateSHA1Hash(password);

        // Timestamps
        const timestamp = new Date();

        // New user entry
        const newUser = await User.create({
          name: name, 
          phone: phone,
          email: email,
          password: hashedPassword,
          passport: passport,
          logs: 0,
          status: 0
          // Sequelize will handle timestamps automatically if you've configured them
        }); 
        if(newUser){
            const wallet = await Wallet.create({
                user_id: newUser.id,
                naira: 0,
                cad: 0,
                usd: 0,
                gbp: 0,
                euro:0 
            });
            res.status(201).json({ message: 'Signup successful', status:'success' });
        }
        else
          res.status(500).json({message:'Signup failed, try again', status:'failed'});
    } catch (error) {
        console.log({error})
        res.status(500).json({message:'Signup failed', status:'failed', error: 'Internal server error' });
    }
  };
  
  exports.getAllUsers = async(req, res) => {
    
    res.send('Users list');

  };
  
  exports.getUserById = (req, res) => {
    const { id } = req.params;
    res.send(`User with ID: ${id}`);
  };
  
  exports.updateUser = (req, res) => {
    const { id } = req.params;
    res.send(`Update user with ID: ${id}`);
  };
  
  exports.deleteUser = (req, res) => {
    const { id } = req.params;
    res.send(`Delete user with ID: ${id}`);
  };
  
  exports.loginUser = (req, res) => {
    // Add login logic here
    res.send('User login');
  };
  
