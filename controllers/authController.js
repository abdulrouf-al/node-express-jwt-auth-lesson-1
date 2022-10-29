
const express = require('express');
const User = require("../models/User");




/* router.signup_get('/signup', (req, res) => {
  res.render('signup');
}); */

module.exports.signup_get = (req, res) => {
  req.flash('success', 'flash testing signup_get ' );
  res.render('signup');
}
//
module.exports.login_get = (req, res) => {
  req.flash('success', 'flash testing login_get');
  res.render('login');
}

module.exports.signup_post = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username })
    const newUser = await User.register(user, password);
    req.login(newUser, err => {

      if (err) return next(err);
      req.flash('success', 'welcome');
      req.session.save(function () {  //https://github.com/jaredhanson/passport/issues/306
        return res.redirect('/');
      }
      )
    }); // when user is signing up  is also logged in

  } catch (e) {
    console.log(e.message);
    req.flash('error', e.message);
    res.redirect('/signup');
  }

}

module.exports.login_post = (req, res) => {
  console.log("req.session");
  req.flash('success', 'welcome');
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  console.log(redirectUrl);
  res.redirect(redirectUrl);
  //res.redirect('/');
};

/*   passport.authenticate('local',
  {
    failureRedirect: '/login',
    failureFlash: true,
    failureMessage: true,
    successFlash: true,
    //successReturnToOrRedirect: true,
    successRedirect:'/'
   }), 
   (req, res) => {
     
     const redirectUrl = req.session.returnTo || '/';
     req.flash('success', 'welcome');
   res.redirect(redirectUrl); 
  } */


module.exports.logout_get = (req, res) => {
  //res.cookie('jwt', '', { maxAge: 1 });
/*   req.logout(function (err) {
    if (err) {
      return next(err);
    }
  })
  req.flash('success', 'loggedOut');
  console.log("req.session");
  res.redirect('/homePage'); */
  req.logout(() => {
    req.flash('success', "Goodbye!");
    res.redirect('/')
  });


}
/* 
 */

/* const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });  
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}




module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
} */