<script lang="ts">
import { sameOfAKind } from '@/calculator';
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            func: sameOfAKind,
            diceValue: 1,
            diceNumber: 1,
        }
    },
    methods: {
        update() {
            this.$emit('updated', this.func(this.diceValue, this.diceNumber))
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
    одинаковых со значением
    <input type="number" v-model="diceValue" @change="update" />
</template>

<style scoped></style>