import db from '../db.js'
import { Readable } from 'stream';
import { createWriteStream } from 'fs';

const test = (data='') => {
    return {text:'hello world', dataReceive: data}
}

const test2 = async (data) => {
    return {text:'hello world', dataReceive: data.data}
}

const test3 = (data) => {
    return {text:'hello world', dataReceive: data}
}

const test4 = async () => {
    const data = await db.query('SELECT * FROM users ')
    return data
}

const test5 = async (data) => {
    try {
        // ตรวจสอบว่า `data.text` มีค่า
        if (!data || !data.text) {
            throw new Error("Invalid input data. Expected an object with a 'text' property.");
        }

        // สร้าง Buffer จากข้อมูลที่รับเข้ามา
        const buffer = Buffer.from(data.text, 'utf-8');
        console.log("Buffer created:", buffer);

        // สร้าง Readable Stream จาก Buffer
        const readable = new Readable({
            read() {
                this.push(buffer); // ผลักข้อมูล Buffer เข้า Stream
                this.push(null);   // บอกว่าไม่มีข้อมูลเพิ่มแล้ว
            }
        });

        // สร้าง Write Stream สำหรับเขียนไฟล์
        const writable = createWriteStream('./testfs/output.txt'); // ไฟล์จะถูกสร้างในโฟลเดอร์เดียวกับไฟล์นี้

        // เชื่อม Readable Stream เข้ากับ Writable Stream
        readable.pipe(writable);

        // เมื่อเขียนไฟล์เสร็จสิ้น
        writable.on('finish', () => {
            console.log("File has been written successfully!");
        });

        return { text: 'hello world', dataReceive: data };

    } catch (error) {
        console.error("An error occurred:", error.message);
        return { text: 'error', dataReceive: null, error: error.message };
    }
};

export default {test,test2,test3,test4,test5}