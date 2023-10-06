<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {
            optionsList: {
                'SumMoreThan': 'Сумма больше X',
                'SumLessThan': 'Сумма меньше X',
                'SumEquals': 'Сумма равна X',
                'SameOfAKind': 'X конкретных одинаковых',
                'SameOfAnyKind': 'X одинаковых',
            }
        }
    },
    props: {
        modelValue: String
    },
    emits: ['update:modelValue'],
})
</script>

<template>
    <select :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
        <option v-for="(value, key) in optionsList" :value="key">{{ value }}</option>
    </select>
</template>

<style scoped>
select {
    border: none;
    color: #fff;
    background-color: var(--color-select);
    padding: 5px;
    border-radius: 5px;
    font-size: inherit;
    transition: 300ms;
    outline: none;
}

select:hover {
    box-shadow: inset 0px 0px 30px #ffffff67;
}
</style>
