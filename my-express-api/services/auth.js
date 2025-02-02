
import jwt from 'jsonwebtoken';
import db from '../db.js'
import argon2 from "argon2";
import 'dotenv/config';

const auth = async (userData) => {
    try {
        const username = userData.username;
        const Password = userData.password;
        // Query to find user based on username
        const user = await db.query('SELECT * FROM users where username = $1 limit 1', [username]);

        // Check if username is provided and if user is found
        if (!username || user?.length < 1 || !user[0]?.username || !user[0]?.password) {
            throw new Error('User not found');
        }
        const isPasswordValid = await argon2.verify(user[0].password, Password);

        if (isPasswordValid) {
            const access_token = jwtGenerate(user[0]);
            const refresh_token = jwtRefreshTokenGenerate(user[0]);

            // Update the refresh token in the database
            await db.query('update users set refresh = $1 where username = $2', [refresh_token, user[0].username]);

            return {
                username,
                access_token,
                refresh_token,
            };
        }
        else {
            throw new Error('Wrong Password');
        }
        // Generate the access token and refresh token

    } catch (error) {
        // Catch and handle any errors
        console.error('Error during authentication:', error);
        throw new Error('Authentication failed');
    }
};


const jwtGenerate = (user) => {
    try {
        const accessToken = jwt.sign(
            { username: user.username, id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3m', algorithm: 'HS256' }
        );

        return accessToken;
    } catch (error) {
        console.error('Error generating access token:', error);
        throw new Error('Failed to generate access token');
    }
};

const jwtRefreshTokenGenerate = (user) => {
    try {
        const refreshToken = jwt.sign(
            { username: user.username, id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d', algorithm: 'HS256' }
        );

        return refreshToken;
    } catch (error) {
        console.error('Error generating refresh token:', error);
        throw new Error('Failed to generate refresh token');
    }
};


const refreshToken = async (data) => {
    try {
        const userData = data;
        const username = data.username

        // Query to fetch user data based on username and ID
        const user = await db.query('SELECT * FROM users where username = $1 limit 1', [userData.username]);

        // Query to fetch token based on the refresh token and username
        const userToken = await db.query('SELECT * FROM users where refresh = $1 and username = $2 limit 1', [userData.refreshToken, userData.username]);

        // Validate user and token existence
        if (user?.length < 1 || userToken?.length < 1) {
            throw new Error('Token is invalid');
        }

        // Generate new tokens
        const access_token = jwtGenerate(user[0]);
        const refresh_token = jwtRefreshTokenGenerate(user[0]);
        // Update the refresh token in the database
        await db.query(`update users set refresh = $1 where id = $2`, [refresh_token, userToken[0].id]);

        return {
            username,
            access_token,
            refresh_token,
        };
    } catch (error) {
        // Catch and handle any errors
        console.error('Error refreshing token:', error);
        throw new Error('Unable to refresh token');
    }
};




export default { auth, refreshToken }