<template>
  <div id="app">
    <comp-header />
    <router-view />
  </div>
</template>

<script>
import CompHeader from "./common/CompHeader.vue";

export default {
  components: { CompHeader },
  name: "app",
  data() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#myInput {
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 50%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  outline: none;
}

.search-Input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.sm-button {
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.success {
  background-color: #4caf50; /* Green */
}

.primary {
  background-color: #239dc2; /* Green */
}

.danger {
  background-color: #c2234b;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

.display-center {
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 1rem;
}

#table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table td,
#table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#table tr:nth-child(even) {
  background-color: #f2f2f2;
}

#table tr:hover {
  background-color: #ddd;
}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  /* margin: 0 10px; */
}

a {
  color: #42b983;
}
</style>
