import {Portal} from './portal';

/**
 * Интерфейс, использующийся для обобщения типа класса
 */
export interface ComponentType<T> {
    new (...args: any[]): T;
}

/**
 * `PortalOutlet` - это место, которое может содержать единичный портал.
 */
export interface PortalOutlet {

    /**
     * Прикрепляет портал к этому аутлету.
     * @param {Portal<any>} portal
     * @returns {any}
     */
    attach(portal: Portal<any>): any;

    /**
     * Открепляет прикрепленный портал от этого аутлета.
     * @returns {any}
     */
    detach(): any;

    /**
     * Выполняет очистку перед тем как аутлет будет уничтожен.
     */
    dispose(): void;

    /**
     * Определяет прикреплен ли портал к аутлету.
     * @returns {boolean}
     */
    hasAttached(): boolean;
}
