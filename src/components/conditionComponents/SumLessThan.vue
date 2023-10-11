<script lang="ts">
import { sumLessThan } from '@/calculator';
import { defineComponent } from 'vue';
import InputNumber from '../InputNumber.vue';

export default defineComponent({
    data() {
        return {
            func: sumLessThan,
            value: 1,
        };
    },
    methods: {
        update() {
            this.$emit('updated', this.func(this.value));
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
    Сумма меньше
    <InputNumber v-model="value" :min="1" @change="update" />
</template>

<style scoped></style>