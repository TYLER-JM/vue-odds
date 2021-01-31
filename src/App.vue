<template>
  <div id="container">
    {{ message }}
  </div>
</template>


<script>
export default {
  data() {
    return {
      message: 'Hello World',
    };
  },
};
</script>

<style>
#container {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>