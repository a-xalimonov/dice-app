<script lang="ts">
import { defineComponent } from 'vue';
import ConditionCard from './ConditionCard.vue';
import type { condition } from '@/calculator';

export default defineComponent({
    data() {
        return {
            lastId: 0,
            conditionsList: [] as number[],
        }
    },
    props: ['results'],
    methods: {
        addCondition() {
            this.conditionsList.push(this.lastId++)
        },
        deleteCondition(index: number) {
            this.conditionsList.splice(index, 1)
            this.$emit('deleted', index)
        },
    },
    components: { ConditionCard },
    emits: ['updated', 'deleted']
})
</script>

<template>
    <div class="main-box">
        <ConditionCard
            v-for="(id, index) in conditionsList"
            :key="id"
            :index="index"
            :result="results[index]"
            @delete="deleteCondition(index)"
            @updated="(func: condition) => $emit('updated', index, func)"
        />
        <img @click="addCondition" alt="Plus Icon" class="plus-icon" src="../assets/plus.svg" />
    </div>
</template>

<style scoped>
.main-box {
    width: 700px;
    background: var(--grad-panel-dark);
    padding: 20px;
}
.plus-icon {
    margin: 0px auto;
    width: 64px;
    height: 64px;
    transition: 300ms;
    display:block;
}
.plus-icon:hover {
    opacity: 0.5;
    cursor: pointer;
}
</style>