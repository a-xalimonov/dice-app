<script lang="ts">
import DiceController from './components/DiceController.vue';
import ConditionController from './components/ConditionController.vue';
import ConditionList from './components/ConditionList.vue';
import { calculateProbs, type condition } from './calculator';

export default {
  components: { DiceController, ConditionController, ConditionList },
  data() {
    return {
      params: {
        conditions: [] as condition[],
        diceNumber: 5,
        diceSize: 6,
      },
      results: [] as number[],
      timerId: -1,
    }
  },
  methods: {
    updateConditions(index: number, func: condition) {
      this.params.conditions[index] = func
    },
    deleteCondition(index: number) {
      this.params.conditions.splice(index, 1)
      this.results.splice(index, 1)
    },
    updateSize(newSize: number) {
      this.params.diceSize = newSize
    },
    updateNumber(newNumber: number) {
      this.params.diceNumber = newNumber
    },
    calculate() {
      clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        console.log('Calculating...')
        this.results = calculateProbs(
          this.params.diceNumber,
          this.params.diceSize,
          this.params.conditions
        )
        console.log('Finished!')
      }, 1000);
    },
  },
  watch: {
    params: {
      handler() {
        this.results = []
        this.calculate()
      },
      deep: true
    }
  }
}
</script>
<template>
  <header>
    <h1>Dice Calculator</h1>
  </header>
  <main>
    <DiceController @update-size="updateSize" @update-number="updateNumber" />
    <ConditionController >
      <ConditionList @updated="updateConditions" @deleted="deleteCondition" :results="results" :main="true"/>
    </ConditionController>
  </main>
</template>

<style scoped>
header {
  text-align: center;
}
</style>
