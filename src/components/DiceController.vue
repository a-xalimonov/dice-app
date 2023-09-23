<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            diceNumber: 5,
            diceSize: 6,
        }
    },
    watch: {
        diceNumber() {
            this.diceNumber = Math.max(this.diceNumber, 1)
            this.diceNumber = Math.min(this.diceNumber, 8)
            this.$emit('update-number', this.diceNumber)
        },

        diceSize() {
            this.diceSize = Math.max(this.diceSize, 1)
            this.diceSize = Math.min(this.diceSize, 8)
            this.$emit('update-size', this.diceSize)
        }
    }
})
</script>

<template>
    <div class="main-box">
        <div class="input-panel">
            <p>
                Число граней: <input type="number" @wheel="(e) => diceSize -= Math.round(e.deltaY / 100)"
                    v-model.lazy="diceSize" min="1" max="20" /></p>
            <p>
                Число костей: <input type="number" @wheel="(e) => diceNumber -= Math.round(e.deltaY / 100)"
                    v-model.lazy="diceNumber" min="1" max="8" /></p>
        </div>
        <div class="dice-panel">
            <img v-for="i in diceNumber" @click="diceNumber--" alt="Dice Icon" class="dice-icon" src="../assets/dice.svg" />
            <img v-show="diceNumber < 8" @click="diceNumber++" alt="Plus Icon" class="dice-icon" src="../assets/plus.svg" />
        </div>
    </div>
</template>

<style scoped>
.main-box {
    width: 700px;
    height: 250px;
    background: var(--grad-panel-dark);
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.dice-panel {
    width: 400px;
}

.dice-icon {
    width: 100px;
    height: 100px;
    transition: 300ms;
}

.dice-icon:hover {
    opacity: 0.5;
    cursor: pointer;
}
</style>