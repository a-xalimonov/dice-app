<script lang="ts">
import { sumEquals } from '@/calculator';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            func: sumEquals,
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
    Сумма равна
    <input type="number" v-model="value" min="1" @change="update" />
</template>

<style scoped></style>