<script lang="ts">
import { sameOfAnyKind } from '@/calculator';
import { defineComponent } from 'vue';
import InputNumber from '../InputNumber.vue';
export default defineComponent({
    data() {
        return {
            func: sameOfAnyKind,
            diceNumber: 1,
        };
    },
    methods: {
        update() {
            this.$emit('updated', this.func(this.diceNumber));
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
    <InputNumber v-model="diceNumber" @change="update" :min="0"/>
    одинаковых
</template>

<style scoped></style>