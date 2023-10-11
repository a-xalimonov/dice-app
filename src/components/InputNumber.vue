<script setup lang="ts">

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1,
    },
    min: Number,
    max: Number
})
const emit = defineEmits(['update:modelValue', 'change'])
function changeHandler(e: Event): void {
    const element = e.target as HTMLInputElement
    const value = Number(element.value)
    if (props.min !== undefined && value < props.min) {
        element.value = props.min.toString()
    }
    if (props.max !== undefined && value > props.max) {
        element.value = props.max.toString()
    }
    emit('update:modelValue', Number(element.value))
    emit('change')
}
function wheelHandler(e: WheelEvent): void {
    const element = e.target as HTMLInputElement
    const value = Number(element.value)
    element.value = Math.floor(value - e.deltaY / 100).toString()
    changeHandler(e)
}
</script>

<template>
    <input type="number" :value="modelValue" @change="changeHandler" @wheel="wheelHandler"/>
</template>

<style scoped>
input[type=number] {
  transition: 300ms;
  border: none;
  background-color: var(--color-input);
  font-size: inherit;
  color: #ffffff;
  width: 50px;
  text-align: center;
  border-radius: 5px;
}
input[type=number]:hover {
  box-shadow: inset 0px 0px 20px #0000002f;
}
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
	display: none;
}
</style>