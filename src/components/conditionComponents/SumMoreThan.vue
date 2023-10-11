<script lang="ts">
import { sumMoreThan } from '@/calculator';
import { defineComponent } from 'vue';
import InputNumber from '../InputNumber.vue';

export default defineComponent({
    data() {
        return {
            func: sumMoreThan,
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
    Сумма больше
    <InputNumber v-model="value" :min="1" @change="update" />
</template>

<style scoped></style>