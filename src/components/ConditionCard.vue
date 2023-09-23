<script lang="ts">
import { defineComponent } from 'vue';
import SumMoreThan from './conditionComponents/SumMoreThan.vue';
import SumLessThan from './conditionComponents/SumLessThan.vue';
import SumEquals from './conditionComponents/SumEquals.vue';
import SameOfAKind from './conditionComponents/SameOfAKind.vue';
import SameOfAnyKind from './conditionComponents/SameOfAnyKind.vue';
import { type condition } from '@/calculator';

export default defineComponent({
    data() {
        return {
            selected: 'SumMoreThan'
        }
    },
    props: {
        result: Number,
        index: Number
    },
    computed: {
        stringResult(): string {
            if (this.result === undefined) {
                return ''
            }
            else {
                return `${(100 * this.result).toFixed(2)}%`
            }
        }
    },
    components: { SumMoreThan, SumLessThan, SumEquals, SameOfAKind, SameOfAnyKind },
    emits: ['delete', 'updated']
})
</script>

<template>
    <div class="card-box">
        <div class="card-header">
            <select v-model="selected">
                <option selected value="SumMoreThan">Сумма больше x</option>
                <option value="SumLessThan">Сумма меньше x</option>
                <option value="SumEquals">Сумма равна x</option>
                <option value="SameOfAKind">Несколько конкретных одинаковых</option>
                <option value="SameOfAnyKind">Несколько одинаковых</option>
            </select>
            <img @click="$emit('delete')" src="../assets/cross.svg"  class="close-icon"/>
        </div>
        <div class="card-content">
            <div  class="condition-content">
                <component :is="selected"
                    @updated="(func: condition) => $emit('updated', func)" />
            </div>
            <div class="result-number">{{ stringResult }}</div>
        </div>
    </div>
</template>

<style scoped>
.card-box {
    margin-bottom: 20px;
    padding: 10px;
    background: var(--grad-panel-light);
}
.card-header {
    margin-bottom: 15px;
}
.card-header,
.card-content {
    display: flex;
    justify-content: space-between;
}
.condition-content {
    width: 75%;
}
.result-number {
    width: 25%;
}
.close-icon {
    height: 39px;
    cursor: pointer;
    transition: 300ms ;
}
.close-icon:hover {
    opacity: 0.5;
}
</style>