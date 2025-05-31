<template>
    <v-app-bar app color="white" flat>
      <v-app-bar-nav-icon />
      <v-toolbar-title>InternLink</v-toolbar-title>
      <v-spacer />
      <v-btn @click="$router.push('/')" text>Home</v-btn>
      <v-btn @click="$router.push('/profile')" text>Profile</v-btn>
      <v-btn @click="$router.push('/login')" text>Exit</v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">

</script>