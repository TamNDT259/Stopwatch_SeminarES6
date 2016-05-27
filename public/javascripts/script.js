var alarmSound = new Audio('mp3/06_Urban_Beat.mp3');
alarmSound.volume = 0.3;
class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.timer = false;
        this.laps = [];
        this.restarted = false;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = [0, 0, 0];
    }

    start() {

        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.restarted = false;
        this.settimer();
    }

    lap() {
        let times = this.times;
        if (this.running) {
            this.reset();
            this.restarted = false;
        }
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }

    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        this.restarted = true;
        if (!this.time){
          this.time = performance.now();
          window.alert("Vo time");
        }

        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
            window.alert("Vo");
        }


        this.reset();

    }

    clear() {
        clearChildren(this.results);
    }

    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    settimer(){
        this.times[0] = parseInt(document.getElementById('timer').value);
        if(this.times[0] != 0){
            this.timer = true;
        }else{
            this.timer = false;
        }
    }
    calculate(timestamp) {
        if(this.timer != true && this.restarted != true){
            var diff = timestamp - this.time;
            this.times[2] += diff / 10;
            if (this.times[2] >= 100) {
                this.times[1] += 1;
                this.times[2] -= 100;
            }
            if (this.times[1] >= 60) {
                this.times[0] += 1;
                this.times[1] -= 60;
            }
        }
        else{
              if(this.restarted != true){
                if(this.times[0] != 0 && this.times[1] == 0 && this.times[2] == 0){
                    this.times[0] -= 1;
                    this.times[1] = 60;
                }
                if(this.times[1] != 0 && this.times[2] == 0){
                    this.times[1] -= 1;
                    this.times[2] = 100;
                }
                if(this.times[2] != 0){
                    this.times[2] -= 1;
                }
                if(this.times[0] == 0 && this.times[1] == 0 && this.times[2] == 0){
                    alarmSound.play();

            }
              }
            }


    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

let pad0 = (value, count)=>{
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

let clearChildren = (node)=>{
    while (node.lastChild)
        node.removeChild(node.lastChild);
}


let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));
