<script lang="ts">
import { defineComponent } from 'vue';
import InputNumber from './InputNumber.vue'
export default defineComponent({
    data() {
        return {
            diceNumber: 5,
            diceSize: 6,
        }
    },
    components: { InputNumber },
    watch: {
        diceSize() {
            this.$emit('update-size', this.diceSize)
        },
        diceNumber() {
            this.$emit('update-number', this.diceNumber)
        },
    },
    emits: ['update-size', 'update-number']
})
</script>

<template>
    <div class="main-box">
        <div class="input-panel">
            <div class="dice-panel">
                <img v-for="i in diceNumber" @click="diceNumber--" alt="Dice Icon" class="dice-icon"
                    src="../assets/dice.svg" />
                <img v-show="diceNumber < 6" @click="diceNumber++" alt="Plus Icon" class="dice-icon"
                    src="../assets/plus.svg" />
            </div>
            <div class="number-input">
                <p>
                    Число граней:
                    <InputNumber v-model="diceSize" :min="1" :max="20" />
                </p>
                <p>
                    Число костей:
                    <InputNumber v-model="diceNumber" :min="1" :max="6" />
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-box {
    width: 700px;
    height: 210px;
    background: var(--grad-panel-dark);
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.input-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-around;
}
.number-input {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.dice-panel {
    width: 100%;
    padding-bottom: 20px;
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