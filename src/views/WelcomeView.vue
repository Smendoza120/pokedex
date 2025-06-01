<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLoading = () => {
  router.push({ name: "loading" })
}
</script>

<template>
  <div class="welcome_container">
    <img class="welcome_logo" src="../assets/images/pikachuMain.png" alt="Pokemon Home">
    <h1 class="welcome_title">Welcome to Pokédex</h1>
    <p class="welcome_text">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.</p>
    <button class="welcome_button" @click.prevent="goToLoading">Get started</button>
  </div>
</template>

<style scoped>
.welcome_container {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;


  & .welcome_logo {
    width: 300px;
  }

  & .welcome_title {
    font-family: var(--font-family-base);
  }

  & .welcome_text {
    text-align: center;
    width: 250px;
    letter-spacing: .5px;
    font-family: var(--font-family-base);
  }

  & .welcome_button {
    cursor: pointer;
    padding: 12px 0px;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: var(--color-primary-red);
    padding: 10px;
  }
}
</style>