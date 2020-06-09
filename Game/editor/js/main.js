window.addEventListener('load', function () {
    e = document.getElementById("image");
    e.addEventListener("click", function () { update()},false);
})

function update() {
    var img = new Image;
    img.src = "editor\\chunk\\layer1\\" + document.getElementById("image").value;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var bw = 500;
    var bh = 500;
    var p = 10;
    var cw = bw + (p * 2) + 1;
    var ch = bh + (p * 2) + 1;
        for (var x = 0; x <= bw; x += 40) {
            ctx.moveTo(0.5 + x + p, p);
            ctx.lineTo(0.5 + x + p, bh + p);
        }

        for (var x = 0; x <= bh; x += 40) {
            ctx.moveTo(p, 0.5 + x + p);
            ctx.lineTo(bw + p, 0.5 + x + p);
        }

    ctx.strokeStyle = "black";
    ctx.stroke();

  
} 