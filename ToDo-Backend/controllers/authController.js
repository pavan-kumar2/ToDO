const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const Session = require("../models/Session");


const createAccessToken = (userId) => {
    return jwt.sign(
        { userId: userId.toString() },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const createRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
}

const hashRefreshToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};



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


    const token = createAccessToken(user._id);
    const refreshToken = createRefreshToken();
    const tokenHash = hashRefreshToken(refreshToken);

    await Session.create({
        userId: user.id,
        tokenHash,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })


    return res.status(200).json({
        message: "Signin successful",
        token: token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })

}

exports.postSignout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const tokenHash = hashRefreshToken(refreshToken);

            await Session.findOneAndUpdate(
                {
                    tokenHash,
                    revokedAt: null
                },
                {
                    revokedAt: new Date()
                }
            )
        }

        res.clearCookie('refreshToken');

        return res.status(200).json({
            success: true,
            message: "Logout Successful"
        })
    } catch (error) {
        next(error)
    }
};

exports.refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: true,
                message: "Refresh token required"
            })
        }

        const tokenHash = hashRefreshToken(refreshToken)

        const session = await Session.findOne({
            tokenHash,
            revokedAt: null,
            expiresAt: {
                $gt: new Date(),
            }
        })


        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token"
            })
        }

        const user = await User.findById(session.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        session.revokedAt = new Date();
        await session.save();

        const accessToken = createAccessToken(user._id);

        const newRefreshToken = createRefreshToken();

        const newTokenHash = hashRefreshToken(newRefreshToken)

        await Session.create({
            userId: user._id,
            tokenHash: newTokenHash,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )

        })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            accessToken
        })

    } catch (error) {
        next(error)
    }
}