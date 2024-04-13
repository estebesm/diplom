export default function useElectronStorage() {
    function setValue(key: string, value: unknown) {
        window.ipcRenderer.send('set-storage', key, value)
    }
    async function getValue(key: string) {
        return await window.ipcRenderer.invoke('get-storage', key);
    }

    return {setValue, getValue}
}