function bdCanvas() {

  opts = {
    minRadius: 0.5,
    maxRadius: 1.4,
    colors: ["rgba(255, 255, 255, 0.7)", "rgba(252, 244, 201, 0.7)", "rgba(201, 252, 201, 0.7)", "rgba(201, 236, 252, 0.7)", "rgba(229, 201, 252, 0.7)", "rgba(252, 201, 201, 0.7)", "rgba(252, 201, 241, 0.7)", "rgba(252, 201, 201, 0.7)"],
  }

  let canvas = document.querySelector("#bdCanvas");

  resizeCanvas();

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", function () {
    windowResize();
  })

  let check;

  function windowResize() {
    clearTimeout(check);
    check = setTimeout(function () {
      resizeCanvas();
    }, 100)
  }

  let ctx = canvas.getContext("2d");

  // ctx.beginPath();
  // ctx.arc(100, 100, 100, 0, Math.PI *2);
  // ctx.fillStyle = "#fff";
  // ctx.fill();
  // ctx.closePath();

  Stars = function (w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = opts.minRadius + Math.random() * (opts.maxRadius - opts.minRadius);
    this.color = opts.colors[[Math.round(Math.random() * opts.colors.length)]];
    console.log([Math.round(Math.random() * opts.colors.length)])

    this.draw = function () {
      console.log (w + " - " + h + " " + this.x + " " + this.y + " " + this.radius)
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  arrStars = [];

  for (let i = 0; i < (w/40) * (h/40); i++) {
    arrStars.push(new Stars(w, h));
    arrStars[i].draw();
  }


  console.log(canvas);
}