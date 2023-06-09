import Form from './src/VBaseForm.vue'
import FormItem from './src/VBaseFormItem.vue'
import FormGroup from './src/VBaseFormGroup.vue'
import ValidationError from './src/VBaseValidationError.vue'

export default Form
export const BaseForm = Form
export const BaseFormItem = FormItem
export const BaseFormGroup = FormGroup
export const BaseValidationError = ValidationError

export * from './src/VForm'
export * from './src/VFormItem'
export * from './src/types'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
