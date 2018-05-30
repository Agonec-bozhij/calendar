import {Portal} from './portal';
import {ComponentType} from '@angular/core/src/render3';
import {ComponentRef, Injector, ViewContainerRef} from '@angular/core';

/**
 * `ComponentPortal` - это портал, который создает компонент при прикреплении.
 */
export class ComponentPortal<T> extends Portal<ComponentRef<T>> {
    /** Тип помпонента, который будет создан для прикрепления. */
    component: ComponentType<T>;

    /**
     * [Optional] Место, где прикрепленный компонент будет жить в логическом дереве компонентов ангуляра.
     * Оно отличается от места, в котором будет отрисовываться, что определяет аутлет.
     * Место происхождения обязательно, если хост находится снаруужи контекста приложения ангуляра.
     */
    viewContainerRef?: ViewContainerRef | null;

    /** [Optional] Инжектор, нужный для создания компонента. */
    injector?: Injector | null;

    constructor(component: ComponentType<T>,
                viewContainerRef?: ViewContainerRef | null,
                injector?: Injector | null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}
