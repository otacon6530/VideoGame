export default class Calendar {
    constructor(startTime) {
        this.time = startTime;
        this.realTime = new Date();
    }
    update() {
        var t2 = this.realTime.getTime();
        var t1 = new Date().getTime();

        this.time = new Date(this.time.getTime() + 96*(t1 - t2));
        this.realTime = new Date(t2 + (t1 - t2));

    }
}
