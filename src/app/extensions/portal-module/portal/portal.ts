import {throwNoPortalAttachedError, throwNullPortalOutletError, throwPortalAlreadyAttachedError} from '../portal-errors';
import {PortalOutlet} from './portal.model';


/**
 * `Портал` - это контент, который вы хотите предварительно сгенерировать.
 * Он может быть прикреплен/откреплен от хоста.
 */
export abstract class Portal<T> {
    private _attachedHost: PortalOutlet | null;

    /**
     * Прикрепляет портал к аутлету.
     * @param {PortalOutlet} host
     * @returns {T}
     */
    attach(host: PortalOutlet): T {
        if (host == null) {
            throwNullPortalOutletError();
        }

        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }

        this._attachedHost = host;
        return <T> host.attach(this);
    }

    /**
     * Открепляет портал от аутлета.
     */
    detach(): void {
        let host = this._attachedHost;

        if (host == null) {
            throwNoPortalAttachedError();
        } else {
            this._attachedHost = null;
            host.detach();
        }
    }

    /**
     * Определяет, прикреплен ли портал к аутлету.
     * @returns {boolean}
     */
    get isAttached(): boolean {
        return this._attachedHost != null;
    }

    /**
     * Устанавливает ссылку на аутлет без вызова `attach()`. Это используется напрямую в
     * аутлете, когда он вызывает методы `attach()` или `detach()`.
     */
    setAttachedHost(host: PortalOutlet | null) {
        this._attachedHost = host;
    }
}
