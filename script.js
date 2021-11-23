function loadImage(url) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    filtres.push(img);
}
const filtresURLs = ['filtres/landscape.jpg', 'filtres/portrait.jpg', 'filtres/carre.jpg'];
const opacity = 0.3;

const upload = document.querySelector('#upload');
const download = document.querySelector('#download');
const canvas = document.querySelector('#canvas');
let filtres = [];

upload.addEventListener('change', () => {
    canvas.style.display = 'none';
    let file = upload.files[0];
    let fr = new FileReader();
    fr.onload = function () {
        let img1 = new Image();
        img1.crossOrigin = "anonymous";
        img1.onload = function () {
            canvas.width = img1.width;
            canvas.height = img1.height;
            let ratio = img1.width / img1.height;

            if (ratio > 1.5) {
                img2 = filtres[0];
            } else if (ratio < 1) {
                img2 = filtres[1];
            }
            else {
                img2 = filtres[2];
            }

            let ctx = canvas.getContext("2d");
            ctx.drawImage(img1, 0, 0);
            ctx.globalAlpha = opacity;
            ctx.drawImage(img2, 0, 0, img1.width, img1.height);
            download.setAttribute('download', 'new_image.png');
            download.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            download.click();
            canvas.style.display = 'block';
        }
        img1.src = fr.result;
    };
    fr.readAsDataURL(file);
});

window.addEventListener('DOMContentLoaded', () => {
    for (let filtreURL of filtresURLs) {
        loadImage(filtreURL);
    }
});
