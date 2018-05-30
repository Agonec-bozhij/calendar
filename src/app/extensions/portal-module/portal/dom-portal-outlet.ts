import {BasePortalOutlet} from './base-portal-outlet';
import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector} from '@angular/core';
import {ComponentPortal} from './portal-component';
import {TemplatePortal} from './portal-template';

/**
 * Аутлет для прикрепления порталов к произвольному DOM элементу снаружи контекста приложения ангуляра.
 */
export class DomPortalOutlet extends BasePortalOutlet {
    constructor(
        public outletElement: Element, // Элемент, в который будет вставлен контент.
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _defaultInjector: Injector) {
        super();
    }

    /**
     * Прикрепление предоставленного ComponentPortal к DOM - элементу с использованием ComponentFactoryResolver.
     * @param portal - портал, который будет прикреплен.
     * @returns возвращает ссылку на созданный компонент.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef: ComponentRef<T>;

        // Если портал указывает ViewContainerRef, мы будем использовать его как место для прикрепления
        // компонента (в терминологии дерева компонентов ангуляра, не рендеринга).
        // Когда ViewContainerRef отсутствует, мы используем фабрику для создания компонента напрямую
        // и потом вручную прикрепляем представление к приложению.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(
                componentFactory,
                portal.viewContainerRef.length,
                portal.injector || portal.viewContainerRef.parentInjector);

            this.setDisposeFn(() => componentRef.destroy());
        } else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this.outletElement.appendChild(this._getComponentRootNode(componentRef));

        return componentRef;
    }

    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     * @returns Reference to the created embedded view.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        let viewContainer = portal.viewContainerRef;
        let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
        viewRef.detectChanges();

        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalOutlet the view can be added everywhere in the DOM
        // (e.g Overlay Container) To move the view to the specified host element. We just
        // re-append the existing root nodes.
        viewRef.rootNodes.forEach(rootNode => this.outletElement.appendChild(rootNode));

        this.setDisposeFn((() => {
            let index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));

        // TODO(jelbourn): Return locals from view.
        return viewRef;
    }

    /**
     * Clears out a portal from the DOM.
     */
    dispose(): void {
        super.dispose();
        if (this.outletElement.parentNode != null) {
            this.outletElement.parentNode.removeChild(this.outletElement);
        }
    }

    /** Gets the root HTMLElement for an instantiated component. */
    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}
