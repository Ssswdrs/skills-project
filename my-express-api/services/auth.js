
import jwt from 'jsonwebtoken';
import db from '../db.js'
import argon2 from "argon2";
import 'dotenv/config';
import redisClient from '../redis.js';
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
            let loginCount = await redisClient.getKey("loginCount")
            await redisClient.setKey("loginCount",typeof loginCount != 'string' ? 0 : (parseInt(loginCount) + 1))
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
        const username = data.username;
        const providedRefreshToken = data.refreshToken;

        if (!username || !providedRefreshToken) {
            throw new Error('Invalid request data');
        }

        // ตรวจสอบ Refresh Token จาก Redis ก่อน
        const cachedRefreshToken = await redisClient.getKey(`refreshToken:${username}`);
        if (cachedRefreshToken && cachedRefreshToken === providedRefreshToken) {
            // Refresh Token ตรงกับข้อมูลใน Redis
            // ดึงข้อมูลผู้ใช้งานจาก Redis หากมี
            let user = await redisClient.getKey(`user:${username}`);
            if (user) {
                user = JSON.parse(user);
            } else {
                // หากไม่มีข้อมูลผู้ใช้งานใน Redis ดึงข้อมูลจากฐานข้อมูล
                const dbUser = await db.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);
                if (dbUser?.length < 1) {
                    throw new Error('User not found');
                }
                user = dbUser[0];
                // แคชข้อมูลผู้ใช้งานใน Redis
                await redisClient.setKey(`user:${username}`, JSON.stringify(user), { EX: 3600 }); // 1 ชั่วโมง
            }

            // สร้าง Access Token และ Refresh Token ใหม่
            const access_token = jwtGenerate(user);
            const new_refresh_token = jwtRefreshTokenGenerate(user);

            // อัปเดต Refresh Token ในฐานข้อมูล
            await db.query('UPDATE users SET refresh = $1 WHERE id = $2', [new_refresh_token, user.id]);

            // อัปเดต Refresh Token ใน Redis
            await redisClient.setKey(`refreshToken:${username}`, new_refresh_token, { EX: 86400 }); // 1 วัน

            return {
                username,
                access_token,
                refresh_token: new_refresh_token,
            };
        }

        // หาก Refresh Token ไม่พบใน Redis ดำเนินการตรวจสอบจากฐานข้อมูล
        const userToken = await db.query(
            'SELECT * FROM users WHERE refresh = $1 AND username = $2 LIMIT 1',
            [providedRefreshToken, username]
        );

        if (userToken?.length < 1) {
            throw new Error('Invalid refresh token');
        }

        // ดึงข้อมูลผู้ใช้งานจากฐานข้อมูล
        let user = await redisClient.getKey(`user:${username}`);
        if (!user) {
            const dbUser = await db.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);
            if (dbUser?.length < 1) {
                throw new Error('User not found');
            }
            user = dbUser[0];
            // แคชข้อมูลผู้ใช้งานใน Redis
            await redisClient.setKey(`user:${username}`, JSON.stringify(user), { EX: 3600 }); // 1 ชั่วโมง
        } else {
            user = JSON.parse(user);
        }

        // สร้าง Access Token และ Refresh Token ใหม่
        const access_token = jwtGenerate(user);
        const new_refresh_token = jwtRefreshTokenGenerate(user);

        // อัปเดต Refresh Token ในฐานข้อมูล
        await db.query('UPDATE users SET refresh = $1 WHERE id = $2', [new_refresh_token, user.id]);

        // อัปเดต Refresh Token ใน Redis
        await redisClient.setKey(`refreshToken:${username}`, new_refresh_token, { EX: 86400 }); // 1 วัน

        return {
            username,
            access_token,
            refresh_token: new_refresh_token,
        };
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Unable to refresh token');
    }
};


export default { auth, refreshToken }