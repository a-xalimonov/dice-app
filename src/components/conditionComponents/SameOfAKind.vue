<script lang="ts">
import { sameOfAKind } from '@/calculator';
import { defineComponent } from 'vue';
import InputNumber from '../InputNumber.vue';
export default defineComponent({
    data() {
        return {
            func: sameOfAKind,
            diceValue: 1,
            diceNumber: 1,
        };
    },
    methods: {
        update() {
            this.$emit('updated', this.func(this.diceValue, this.diceNumber));
        }
    },
    mounted() {
        this.update();
    },
    emits: ['updated'],
    components: { InputNumber }
})
</script>

<template>
    <InputNumber v-model="diceNumber" :min="0"/>
    одинаковых со значением
    <InputNumber v-model="diceValue" :min="1"/>
</template>

<style scoped></style>