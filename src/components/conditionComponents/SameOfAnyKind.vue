<script lang="ts">
import { sameOfAnyKind } from '@/calculator';
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            func: sameOfAnyKind,
            diceNumber: 1,
        }
    },
    methods: {
        update() {
            this.$emit('updated', this.func(this.diceNumber))
        }
    },
    mounted() {
        this.update()
    },
    emits: ['updated']
})
</script>

<template>
    <input type="number" v-model="diceNumber" @change="update" />
    одинаковых
</template>

<style scoped></style>