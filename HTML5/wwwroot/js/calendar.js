export default class Calendar {
    constructor(season, day, hour) {
        this.realTime = new Date();
        this.season = season; 
        this.day = day;
        this.hour = hour;
    }
    update() {
        var t2 = this.realTime.getTime();
        var t1 = new Date().getTime();

        this.hour = this.hour + (t1 - t2) / 1000 / 60;
        if (this.hour > 24) {
            this.day = this.day + 1;
            this.hour = 0;
        }
        if (this.day > 30) {
            this.day = 1;
            this.season = this.season +1
        }
        if (this.season > 4) {
            this.season = 1;
        }
        this.realTime = new Date(t2 + (t1 - t2));

    }

}
