<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
})
</script>

<template>
    <div class="main-box">
        <slot></slot>
    </div>
</template>

<style scoped>
.main-box {
    width: 700px;
    background: var(--grad-panel-dark);
    padding: 10px;
}
</style>