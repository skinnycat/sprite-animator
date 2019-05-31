(function($) {
    $.fn.spriteAnimator = function(params) {
        let sprite = this,
        width = sprite.width(),
        height = sprite.height(),
        defaults = {
            direction: "forward",
            frames: 1,
            fps: 30,
            loop: 1,
            rows: 1,
            cols: 1
        };
        params = $.extend({}, defaults, params);
        let currFrame = 1,
        currCol = 1,
        currRow = 1,
        shortCol = params.cols,
        shortRow = params.rows,
        x = 0,
        y = 0,
        stop = false,
        frameCount = 0,
        interval, startTime, now, then, elapsed, animRequest;
        if (params.direction === "reverse") {
            rowMultiplier = 1;
            colMultiplier = 1;
            missingFrames = (params.cols * params.rows) - params.frames;
            if (missingFrames > 0) {
                if (missingFrames > params.cols) {
                    rowMultiplier = (params.rows - (Math.floor(missingFrames / params.cols))) + 1;
                    colMultiplier = (params.cols - missingFrames % params.cols) + 1
                } else {
                    colMultiplier = missingFrames + 1
                }
            }
            shortCol = (Math.abs(params.cols) - colMultiplier);
            shortRow = (Math.abs(params.rows) - rowMultiplier);
            x = (width * shortCol);
            y = (height * shortRow);
            width = -Math.abs(width);
            height = -Math.abs(height)
        }
        initAnim(params.fps);

        function initAnim(fps) {
            interval = 1000 / fps;
            then = window.performance.now();
            startTime = then;
            animateMe();
        }

        function animateMe() {
            if (stop) {
                cancelAnimationFrame(animRequest)
                return
            }
            animRequest = requestAnimationFrame(animateMe);
            currTime = window.performance.now();
            elapsed = currTime - then;
            if (elapsed > interval) {
                then = currTime - (elapsed % interval);
                $(sprite).css("backgroundPosition", (-x) + "px " + (-y) + "px");
                if ((currCol < shortCol + 1) && (currCol < params.cols)) {
                    currCol++;
                    x = x + width
                } else {
                    if (params.direction === "reverse") {
                        currCol = 1;
                        x = width * (params.cols + 1)
                    } else {
                        currCol = 1;
                        x = 0
                    }
                    shortCol = params.cols;
                    if (currRow < params.rows) {
                        currRow++;
                        y = y + height
                    } else {
                        currRow = 1
                    }
                }
                currFrame++;
                (currFrame > Math.abs(params.frames)) && (stop = true);
                //(currFrame > Math.abs(params.frames)) stop = true;
                console.log(stop);
            }
            
        }
        return this
    }
}(jQuery));