let clientContextCache

export function get() {
  return clientContextCache
}

export function set(context) {
  clientContextCache = context
}