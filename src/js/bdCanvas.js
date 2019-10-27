function bdCanvas() {

  opts = {
    minRadius: 0.5,
    maxRadius: 1.5,
    colors: ["rgba(255, 255, 255, 0.5)", "rgba(252, 244, 201, 0.5)", "rgba(201, 252, 201, 0.5)", "rgba(201, 236, 252, 0.5)", "rgba(229, 201, 252, 0.5)", "rgba(252, 201, 201, 0.5)", "rgba(252, 201, 241, 0.5)", "rgba(252, 201, 201, 0.5)"],
    delay: 100,
    step: 0.05,
    trangles: 4,
    intervalRadius: 2.5,
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
      clearInterval(animations);
      resizeCanvas();
      setup();
    }, 100)
  }

  let ctx = canvas.getContext("2d");

  Stars = function (w, h) {
    this.x = Math.random() * w;
    this.y = (Math.random() * (h -210 -40)) +40;
    this.color = opts.colors[[Math.round(Math.random() * opts.colors.length)]];
    this.vector = Math.round(Math.random()) || -1;
    this.minRadius = opts.minRadius + Math.random() * (opts.maxRadius - opts.minRadius);
    this.maxRadius = this.minRadius + opts.intervalRadius;

    this.draw = function () {

      ctx.beginPath();

      ctx.moveTo(this.x, this.y + this.minRadius);

      for (var i = 0; i < 2 * opts.trangles + 1; i++) {
        var r = (i % 2 == 0) ? this.minRadius : this.maxRadius;
        var a = (Math.PI * i / opts.trangles) + 45 * Math.PI / 180;
        ctx.lineTo(this.x + r * Math.sin(a), this.y + r * Math.cos(a));
      };

      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();

    }

    this.update = function () {
      this.check();
      this.minRadius += opts.step * this.vector;
      this.maxRadius += opts.step * this.vector;
    }

    this.check = function () {
      if (this.minRadius > opts.maxRadius || this.minRadius < opts.minRadius) {
        this.vector *= -1;
      }
    }

  }

  function setup() {
    arrStars = [];

    for (let i = 0; i < (w / 150) * (h / 150); i++) {
      arrStars.push(new Stars(w, h));
      arrStars[i].draw();
    }
    loop()
  }

  setup();

  function loop() {
    animations = setInterval(function () {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < arrStars.length; i++) {
        arrStars[i].update();
        arrStars[i].draw();
      }
    }, opts.delay);
  }

}