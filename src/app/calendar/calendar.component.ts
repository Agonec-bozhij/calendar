import {Component, EventEmitter, Output} from '@angular/core';
import {CalendarDay} from './calendar.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
    public currentYear: number;
    public currentMonth: number;

    public previousDays: CalendarDay[] = [];
    public nextDays: CalendarDay[] = [];
    public currentDays: CalendarDay[] = [];

    public monthsRuNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь',
        'Декабрь'];
    public daysRuNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    constructor() {
        const date = new Date();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth();

        this.fillDays();
    }

    private fillDays() {
        const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth - 1, 32).getDate();

        const leftOffset = (new Date(this.currentYear, this.currentMonth - 1, 1)).getDay() - 1;
        const rightOffset = 7 - (new Date(this.currentYear, this.currentMonth - 1, daysInMonth)).getDay();

        this.fillOffsetDays(leftOffset < 0 ? 6 : leftOffset, 'rtl');
        this.fillOffsetDays(rightOffset === 7 ? 0 : rightOffset, 'ltr');
        this.fillOffsetDays(daysInMonth);
    }

    private fillOffsetDays(offset: number, direction?: 'ltr' | 'rtl') {
        let daysInMonth = this.getDaysInMonth(this.currentMonth - 1);
        while (offset) {
            switch (direction) {
                case 'rtl':
                    this.previousDays.unshift({dayNum: daysInMonth, events: []});
                    daysInMonth--;
                    break;
                case 'ltr':
                    this.nextDays.push({dayNum: this.nextDays.length + 1, events: []});
                    break;
                default:
                    this.currentDays.push({dayNum: this.currentDays.length + 1, events: []});
            }
            offset--;
        }
    }

    private getDaysInMonth(month): number {
        return 32 - new Date(this.currentYear, month, 32).getDate();
    }
}
