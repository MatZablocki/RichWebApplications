//array of images
let ytImages = [
    "https://ihitthebutton.com/wp-content/uploads/2020/11/youtube-subscribe-png.png",
    "https://img.freepik.com/free-vector/subscription-button-with-bell-icon-notification_1017-43364.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696723200&semt=ais",
    "https://e7.pngegg.com/pngimages/102/1004/png-clipart-tiktok-subscribe-youtube-subscribe-now-button-button-youtube-branding-branding-social-media-subscribe-png.png",
];

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * ytImages.length)
    imgs[i].src = ytImages[randomImg]
}
//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Follow MatZa7 on twitch.";
}
//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "Subscribe to MatZa on Youtube.";
}

const h3 = document.getElementsByTagName("h3");
for (let i = 0; i < h3.length; i++){
    h3[i].innerText = "Subscribe to MatZa on Youtube.";
}

const b = document.getElementsByTagName("b");
for (let i = 0; i < b.length; i++){
    b[i].innerText = "Subscribe to MatZa on Youtube.";
}


const links = document.getElementsByTagName("a");
for (let i = 0; i < links.length; i++){
    links[i].href = "https://www.youtube.com/@matza2805/featured";
}
