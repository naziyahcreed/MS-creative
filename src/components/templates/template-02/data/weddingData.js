import defaultData from '../defaultData'

let activeData = null

export function setTemplate02Data(data) {
  activeData = data
}

export function resetTemplate02Data() {
  activeData = null
}

export const weddingData = new Proxy(defaultData, {
  get(target, prop) {
    const current = activeData || defaultData
    return current[prop] !== undefined ? current[prop] : target[prop]
  }
})

export default weddingData
