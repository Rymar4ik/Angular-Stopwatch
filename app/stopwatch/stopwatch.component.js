angular
    .module("stopWatch")
    .component("stopWatch", {
        templateUrl: "stopwatch/stopwatch.template.html",
        controller: ["$interval",
            function ($interval) {
                /**Init start value*/
                var self = this;
                var lapCounter = 0;
                this.lapTimer = 0;
                this.mainTimer = 0;
                /**Flag value to hide or show button or make them active*/
                this.isLapBtnActive = false;
                this.isStopBtnHide = true;
                this.isLapBtnHide = false;
                this.isStartBtnHide = false;
                this.isResetBtnHide = true;
                this.result = [];

                this.startBothTimer = function () {

                    /**Make Lap button active only when App was start*/
                    if (this.isLapBtnActive == false) {
                        this.isLapBtnActive = true;
                    }

                    this.isStartBtnHide = true;
                    this.isStopBtnHide = false;
                    this.startMainTimer();

                    /**isLapBtnActive true when App was start, so we need only continue LapTimer
                     *if that false write result to array and start new lap*/
                    if (this.isLapBtnActive == true) {
                        this.isLapBtnHide = false;
                        this.isResetBtnHide = true;
                        this.continueLapTimer();
                    }
                    else {
                        this.startLapTimer();
                    }
                };

                this.startLapTimer = function () {

                    if (this.lapTimerHandle) {
                        $interval.cancel(this.lapTimerHandle);
                        this.result.unshift({time: this.lapTimer, lapNum: ++lapCounter});
                    }

                    this.lapTimer = 0;

                    this.lapTimerHandle = $interval(step, 10);

                    function step() {
                        self.lapTimer += 10;
                    }
                };

                this.continueLapTimer = function () {

                    this.lapTimerHandle = $interval(step, 10);

                    function step() {
                        self.lapTimer += 10;
                    }
                };

                this.startMainTimer = function () {

                    // if (this.mainTimerHandle) {
                    //     $interval.cancel(this.mainTimerHandle);
                    // }

                    this.mainTimerHandle = $interval(step, 10);

                    function step() {
                        self.mainTimer += 10;
                    }
                };

                this.stopBothTimer = function () {

                    this.isLapBtnHide = true;
                    this.isResetBtnHide = false;
                    this.isStartBtnHide = false
                    this.isStopBtnHide = true;
                    $interval.cancel(this.lapTimerHandle);
                    $interval.cancel(this.mainTimerHandle);
                };
                //Change app to the start condition
                this.resetAll = function () {

                    this.lapTimer = 0;
                    this.mainTimer = 0;
                    lapCounter = 0
                    this.isLapBtnActive = false;
                    this.result = [];
                    this.lapTimerHandle = 0;
                    this.mainTimerHandle = 0;

                    this.isStopBtnHide = true;
                    this.isLapBtnHide = false;
                    this.isStartBtnHide = false;
                    this.isResetBtnHide = true;
                }


            }
        ]
    })
    /**
     * Angular filter to correct displaying time on the view
     * @param {time} Time in milliseconds representation
     * @return {string} String-time that looks like mm:ss,ms*/

    .filter('stopwatchTime', function () {
        return function (time) {
            var milsec_num = parseInt(time, 10);

            var minutes = Math.floor(milsec_num / 60000);
            var seconds = Math.floor((milsec_num - (minutes * 60000)) / 1000);
            var milliseconds = Math.floor((milsec_num - (minutes * 60000) - (seconds * 1000 )) / 10);

            if (minutes > 59)
                return "ERROR";

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (milliseconds < 10) {
                milliseconds = "0" + milliseconds;
            }
            return minutes + ':' + seconds + ',' + milliseconds;
        }
    });
