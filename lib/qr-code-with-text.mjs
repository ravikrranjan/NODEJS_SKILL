import QRCode from "qrcode";
import Canvas from "canvas";
import fs from 'fs';

const text = 'QR Code with text';
const print = (args) => console.log(args);


const qr_code_size = 800;
(async () => {

    try {
        //! Generate QR Code 
        const url = await QRCode.toDataURL(text, { width: qr_code_size });
        // print(url)

        const canvas = Canvas.createCanvas(qr_code_size, qr_code_size);
        const ctx = canvas.getContext('2d');

        //~* Create Image object write QRCode to image
        // ~*Draw Image to canvas
        const img = new Canvas.Image();
        img.src = url;
        ctx.drawImage(img, 0, 0, qr_code_size, qr_code_size);

        //~^ Write text to canvas
        ctx.font = "30px Impact";
        ctx.fillStyle = "#000000";
        ctx.fillText(text, 100, 50);


        //~Create canvas stream
        const stream = canvas.createJPEGStream();
        //~*Create file witable stream 
        const file = fs.createWriteStream('qr-code-with-text.jpeg');

        //~? Write canvas to file
        stream.pipe(file);

    } catch (error) {
        print(`Exception:: ${error}`)
    }
})();

