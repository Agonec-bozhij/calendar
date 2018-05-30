import {animate, style, transition, trigger} from '@angular/animations';

export const scaleCalendarTrigger = trigger('scaleState', [
    transition('void => *', [
        style({
            transform: 'scale(0)'
        }),
        animate('0.3s cubic-bezier(0.7, 0, 0.3, 1)')
    ]),
    transition(':leave', animate('0.3s cubic-bezier(0.7, 0, 0.3, 1)', style({
        transform: 'scale(0)'
    })))
]);
