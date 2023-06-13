<script>
import axios from 'axios';

export default {
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    this.getProject();
  },
  methods: {
    getProject() {
      console.log('get projects');
      axios.get('http://localhost:8000/api/projects').then(resp => {
        this.projects = resp.data.results;
      })
    }
  }
}
</script>

<template>
  <h1>Hello</h1>
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>