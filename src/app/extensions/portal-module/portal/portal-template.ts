import {Portal} from './portal';
import {ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
import {PortalOutlet} from './portal.model';

/**
 * `TemplatePortal` - это портал, который представляет встроенный шаблон (TemplateRef).
 */
export class TemplatePortal<C = any> extends Portal<C> {
    /** Встроенный шаблон, который будет использован для создания встроенного представления в хосте. */
    templateRef: TemplateRef<C>;

    /** Ссылка на контейнер, в который будет вставлен шаблон и создано представление. */
    viewContainerRef: ViewContainerRef;

    /** Данные контекста, которые будут переданы в шаблон при создании представления. */
    context: C | undefined;

    constructor(template: TemplateRef<C>, viewContainerRef: ViewContainerRef, context?: C) {
        super();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
        this.context = context;
    }

    get origin(): ElementRef {
        return this.templateRef.elementRef;
    }

    /**
     * Прикрепление портала к аутлету.
     * Если предоставлен контекст - он перезапишет одноименное свойство в экземпляре `TemplatePortal`.
     */
    attach(host: PortalOutlet, context: C | undefined = this.context): C {
        this.context = context;
        return super.attach(host);
    }

    detach(): void {
        this.context = undefined;
        return super.detach();
    }
}
