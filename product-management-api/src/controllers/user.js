const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Création d'un nouvel utilisateur avec l'email et le mot de passe hashé
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await user.save();
    res.status(201).json({ message: 'User created!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.login = async (req, res, next) => {
  User.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' }
                      )
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};