const User = require("../models/User");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.postSignup = [
    check('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),

    check('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character'),

    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    (req, res, next) => {
        const { name, email, password } = req.body

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array().map(err => err.msg),
                fields: { name, email, password },
            });
        }

        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    name: name,
                    email: email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                res.status(201).json({
                    message: 'User created successfully',
                    user: result
                });
            })
            .catch(err => {
                if (err.code === 11000) {
                    return res.status(409).json({
                        error: 'Email already exists'
                    });
                }
                console.error(err);
                res.status(500).json({
                    error: 'An error occurred while creating the user'
                });
            });
    }
]

exports.postSignin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            error: 'Invalid credentials'
        });
    }

    return res.status(200).json({
        message: "Signin successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });

}