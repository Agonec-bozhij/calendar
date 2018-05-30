/**
 * Список выбрасываемых исключений, использующихся в модуле Portal.
 */

/**
 * Выбрасывает исключение, когда происходит попытка привязки null portal к хосту.
 */
export function throwNullPortalError() {
    throw Error('Must provide a portal to attach');
}

/**
 * Выбрасывает исключение, когда происходит попытка привязать портал к хосту, к которому уже привязан портал.
 */
export function throwPortalAlreadyAttachedError() {
    throw Error('Host already has a portal attached');
}

/**
 * Выбрасывает исключение, когда происходит попытка привязки портала к уже удаленному хосту.
 */
export function throwPortalOutletAlreadyDisposedError() {
    throw Error('This PortalOutlet has already been disposed');
}

/**
 * Выбрасывает исключение, когда происходит привязка неизвестного типа портала.
 */
export function throwUnknownPortalTypeError() {
    throw Error('Attempting to attach an unknown Portal type. BasePortalOutlet accepts either ' +
        'a ComponentPortal or a TemplatePortal');
}

/**
 * Выбрасывает исключение, когда происходит попытка привязать портал к null host.
 */
export function throwNullPortalOutletError() {
    throw Error('Attempting to attach a portal to a null PortalOutlet');
}

/**
 * Выбрасывает исключение, когда происходит попытка открепить портал, который не закреплен за хостом.
 */
export function throwNoPortalAttachedError() {
    throw Error('Attempting to detach a portal that is not attached to a host');
}
