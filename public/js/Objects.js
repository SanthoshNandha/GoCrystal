// js file to maintain timer for changing levels.
// create timer stop and restart timer.

var timerBarWidthScale = d3.scaleLinear()
							.range([0, 100]);
var gameTimer =
{
    timeBar : $("#timeProgressBar"),
	time: 0,
    interval: undefined,

    start: function () {
        var self = this;
        timerBarWidthScale.domain([0,this.time])
        this.interval = setInterval(function () { 
										        	self.tick();  
										        	self.updateTimeBar();
        										}, 1000);
    },
    tick: function () {
        this.time--;
    },
    resetTimeBar: function(){
    	this.timeBar.width("100%");
    },
    updateTimeBar: function(){
    	if(this.time < 0){
    		return;
    	}
    	this.timeBar.animate({width: timerBarWidthScale(this.time) + "%"}, 500);
    	var timer = document.getElementById("timer");
        timer.innerHTML =  this.time;
    	//this.timeBar.width(this.time + "%");
    },
    stop: function () {
        clearInterval(this.interval);
        //this.timeBar.width("100%");
    },
    reset: function () {
        this.time = 0;
    }
};

/* var swapTimer = {
		interval: undefined,
		delayTime:10000,
		setDelay: function(delay){
			this.delayTime = delay;
		},
		start: function(){
			this.interval = setInterval(SelectadjacentLatices, this.delayTime);
		},
		stop:function(){
			clearInterval(this.interval);
		}
} */

var messageObject =
{
    x: 0,
    y: 0,
    visible: true,
    text: "Message",
    font: "normal bold 20px Helvetica",
    fillStyle: "red",
    textBaseline: "top"
};