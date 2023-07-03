// @ts-nocheck
// @ts-ignore
import { getCurrentInstance } from 'vue'
import MessageBox from './src/VMessageBox'
import type { App } from 'vue'




MessageBox.install = (app: App) => {


    MessageBox._context = app._context
    app.config.globalProperties.$msgbox = MessageBox
    app.config.globalProperties.$messageBox = MessageBox
    app.config.globalProperties.$alert = MessageBox.alert
    app.config.globalProperties.$confirm = MessageBox.confirm
    app.config.globalProperties.$prompt = MessageBox.prompt
}

export default MessageBox
export const BaseMessageBox = MessageBox

export * from './src/VMessageBox.type'
