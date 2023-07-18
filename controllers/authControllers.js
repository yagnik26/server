const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SIGNUP

const signup = async (req, res) => {


  try {
    let { name, email, password ,cpassword} = req.body;

    console.log(req.body);

    if (!(name, email, password, cpassword)) {
      return res.status(400).send("all fields are required");
    }

    if(password !== cpassword)
    {
        return res.status(400).send('Password cannot match');
    }

    let oldUser = await user.findOne({ email: email });

    if (oldUser) {
      return res.status(400).send("user already exists");
    }

    let hashPassword = await bcrypt.hash(password, 10);

    await user.create({
      name,
      email,
      password: hashPassword,
    });

    let userData = await user.findOne({ email: email });

    console.log(userData.id);

    const token = await jwt.sign(userData.id, process.env.TOKEN_KEY);

    console.log(token);

    res.cookie("jwt", token);

    return res.status(200).send('User created successfully');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// LOG IN

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!(email, password)) {
      return res.status(401).send("All fealds are required");
    }

    let matchuser = await user.findOne({ email: email });

    if (!matchuser) {
      return res.status(401).send("user not found");
    }

    let matchpassword = await bcrypt.compare(password, matchuser.password);

    if (!matchpassword) {
      return res.status(401).send("password is incorrect");
    }

    const token = await jwt.sign(matchuser.id, process.env.TOKEN_KEY);

    console.log(token);

    res.cookie("jwt", token);

    // return res.send("done");
    let data = {
        massage: "done"
    }
    return res.json(data)
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// UPDATE USER

const updateuser = async (req, res) => {
    try {
        let id = req.params.id;

        let {name, email} = req.body;

        if(!(name, email))
        {
            return res.status(400).send("All fields are required")
        }

        let token = req.cookies.jwt;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        if(userid !== id)
        {
            return res.status(400).send('only user can update data')
        }

        await user.findByIdAndUpdate(id, req.body)

        return res.status(200).send('user updated successfully')

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

// DELETE USER

const deleteuser = async (req, res) => {
    try {
        let id = req.params.id;

        let token = req.cookies.jwt;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        if(userid !== id)
        {
            return res.status(400).send('only user can update data')
        }

        await user.findByIdAndDelete(id)

        return res.status(200).send('user deleted successfully');

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

// USER LOGOUT

const logout = (req, res) => {
    try {
        req.logout((err) => {
            return res.status(500).send(err.message)
        })
        return res.status(200).send('user logged out successfully');
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

module.exports = {
  signup,
  login,
  updateuser,
  deleteuser,
  logout
};
