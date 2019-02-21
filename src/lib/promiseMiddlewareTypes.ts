export function pending(type: string) {
    return `${type}_PENDING`;
}

export function fulfilled(type: string) {
    return `${type}_FULFILLED`;
}

export function failed(type: string) {
    return `${type}_REJECTED`;
}
