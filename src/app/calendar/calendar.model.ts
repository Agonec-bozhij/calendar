export interface CalendarYears {
    [key: number]: CalendarMonths;
}

export interface CalendarMonths {
    [key: number]: CalendarEvent[];
}

export interface CalendarEvent {
    name: string;
    members: string[];
    about: string;
    date: Date;
}

export interface CalendarDay {
    dayNum: number;
    events: CalendarEvent[];
}
