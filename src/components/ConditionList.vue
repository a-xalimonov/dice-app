<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { condition } from '@/calculator';
import SelectCondition from './SelectCondition.vue';
import SumMoreThan from './conditionComponents/SumMoreThan.vue';
import SumLessThan from './conditionComponents/SumLessThan.vue';
import SumEquals from './conditionComponents/SumEquals.vue';
import SameOfAKind from './conditionComponents/SameOfAKind.vue';
import SameOfAnyKind from './conditionComponents/SameOfAnyKind.vue';

export default defineComponent({
    name: 'ConditionsList',
    data() {
        return {
            lastId: 0,
            conditionList: [] as { id: number, conditionStr: string, subConditions: condition[] }[],
        };
    },
    methods: {
        addCondition(): void {
            this.conditionList.push({
                id: this.lastId++,
                conditionStr: 'SumMoreThan',
                subConditions: [],
            })
        },
        deleteCondition(index: number): void {
            this.conditionList.splice(index, 1)
            this.$emit('delete', index)
        },
        complexCondition(conditionStr: string): boolean {
            return conditionStr === 'And' || conditionStr === 'Or'
        },
        update(index: number, func: condition): void {
            this.$emit('updated', index, func)
        },
        updateAnd(index: number, subIndex: number, func: condition) {
            this.conditionList[index].subConditions[subIndex] = func
            const resFunc = this.conditionList[index].subConditions.reduce(
                (previous, current) => {
                    return (arr: number[]) => previous(arr) && current(arr)
                }
            )
            this.update(index, resFunc)
        },
        updateOr(index: number, subIndex: number, func: condition) {
            this.conditionList[index].subConditions[subIndex] = func
            const resFunc = this.conditionList[index].subConditions.reduce(
                (previous, current) => {
                    return (arr: number[]) => previous(arr) || current(arr)
                }
            )
            this.update(index, resFunc)
        },
    },
    computed: {
        stringResults(): string[] {
            if (this.results !== undefined) {
                return this.results.map(value => (100 * value).toFixed(2) + '%')
            }
            else {
                return []
            }
        }
    },
    props: {
        results: {
            type: Array as PropType<number[]>,
            default: []
        },
        main: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['updated', 'delete'],
    components: { SelectCondition, SumMoreThan, SumLessThan, SumEquals, SameOfAKind, SameOfAnyKind },
})
</script>

<template>
    <div class="list-box">
        <div v-for="(item, index) in conditionList" :key="item.id" class="card-box">
            <div class="card-header">
                <SelectCondition v-model="conditionList[index].conditionStr" />
                <img @click="deleteCondition(index)" src="../assets/cross.svg" class="close-icon" />
            </div>
            <div class="card-content">
                <div class="condition-content">
                    <ConditionsList v-if="item.conditionStr === 'And'"
                        @updated="(subIndex: number, func: condition) => updateAnd(index, subIndex, func)" />
                    <ConditionsList v-else-if="item.conditionStr === 'Or'"
                        @updated="(subIndex: number, func: condition) => updateOr(index, subIndex, func)" />
                    <component v-else :is="conditionList[index].conditionStr"
                        @updated="(func: condition) => update(index, func)" />
                </div>
                <div v-show="main" class="result-number">{{ stringResults[index] }}</div>
            </div>
        </div>
        <img @click="addCondition" alt="Plus Icon" class="plus-icon" src="../assets/plus.svg" />
    </div>
</template>

<style scoped>
.plus-icon {
    margin: 0px auto;
    width: 64px;
    height: 64px;
    transition: 300ms;
    display: block;
}

.plus-icon:hover {
    opacity: 0.5;
    cursor: pointer;
}

.card-box {
    margin-bottom: 20px;
    padding: 10px;
    background: var(--grad-panel-light);
    box-shadow: 2px 2px 12px #00000059;
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
    width: 100%;
}

.result-number {
    width: 120px;
    text-align: center;
}

.close-icon {
    height: 30px;
    cursor: pointer;
    transition: 300ms;
}

.close-icon:hover {
    opacity: 0.5;
}
</style>