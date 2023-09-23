<script lang="ts">
import { sumLessThan } from '@/calculator';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            func: sumLessThan,
            value: 1,
        }
    },
    methods: {
        update() {
            this.$emit('updated', this.func(this.value))
        }
    },
    mounted() {
        this.update()
    },
    emits: ['updated']
})
</script>

<template>
    Сумма меньше
    <input type="number" v-model="value" min="1" @change="update" />
</template>

<style scoped></style>