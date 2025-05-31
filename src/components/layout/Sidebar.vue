<template>
  <v-navigation-drawer app expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="fa-solid fa-house"
        title="Home"
        value="home"
        @click="$router.push('/')"
      />
      <v-list-item
        prepend-icon="fa-solid fa-school"
        title="Schools"
        value="schools"
        @click="$router.push('/schools')"
      />
      <v-list-item
        prepend-icon="fa-solid fa-chalkboard-user"
        title="Tutors"
        value="tutors"
        @click="$router.push('/tutors')"
      />
      <v-list-item
        prepend-icon="fa-solid fa-graduation-cap"
        title="Students"
        value="students"
        @click="$router.push('/students')"
      />
      <v-list-item
        prepend-icon="fa-solid fa-briefcase"
        title="Companies"
        value="companies"
        @click="$router.push('/companies')"
      />
      <v-list-item
        prepend-icon="fa-solid fa-user"
        title="Profile"
        value="profile"
        @click="$router.push('/profile')"
      />
      <v-list-item
        prepend-icon="fa-solid fa-gear"
        title="Settings"
        value="settings"
        @click="$router.push('/settings')"
      />
    </v-list>
  </v-navigation-drawer>
</template>
