<!-- src/components/Counter.vue -->
<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    }
  }
};
</script>

<template>
  <div>
    <button @click="decrement">-</button>
    <span>{{count}}</span>
    <button @click="increment">+</button>
  </div>
</template>