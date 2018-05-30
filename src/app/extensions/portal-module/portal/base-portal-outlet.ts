import {Portal} from './portal';
import {PortalOutlet} from './portal.model';
import {ComponentPortal} from './portal-component';
import {ComponentRef, EmbeddedViewRef} from '@angular/core';
import {TemplatePortal} from './portal-template';
import {
    throwNullPortalError, throwPortalAlreadyAttachedError, throwPortalOutletAlreadyDisposedError,
    throwUnknownPortalTypeError
} from '../portal-errors';

/**
 * Частичная реализация аутлета, которая управляет прикреплением порталов
 * ComponentPortal и TemplatePortal.
 */
export abstract class BasePortalOutlet implements PortalOutlet {
    /** Портал, прикрепленный к хосту. */
    protected _attachedPortal: Portal<any> | null;

    /** Функция, которая удалит хост. */
    private _disposeFn: (() => void) | null;

    /** Определяет, удален ли хост. */
    private _isDisposed = false;

    /** Проверяет, есть ли у хоста прикрепленный портал. */
    hasAttached(): boolean {
        return !!this._attachedPortal;
    }

    attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
    attach(portal: any): any;

    /** Прикрепляет портал к хосту. */
    attach(portal: Portal<any>): any {
        if (!portal) {
            throwNullPortalError();
        }

        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }

        if (this._isDisposed) {
            throwPortalOutletAlreadyDisposedError();
        }

        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        } else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }

        throwUnknownPortalTypeError();
    }

    abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

    abstract attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;

    /** Открепляет прикрепленный портал. */
    detach(): void {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }

        this._invokeDisposeFn();
    }

    /** Удаляет хост. */
    dispose(): void {
        if (this.hasAttached()) {
            this.detach();
        }

        this._invokeDisposeFn();
        this._isDisposed = true;
    }

    setDisposeFn(fn: () => void) {
        this._disposeFn = fn;
    }

    private _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}
