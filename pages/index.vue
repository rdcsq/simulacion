<script setup lang="ts">
import type { randomInteger } from '~/utils/random-numbers';
</script>

<template>
Homepage
<p>{{ randomInteger(10, 100) }}</p>
</template>