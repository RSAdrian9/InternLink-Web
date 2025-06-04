<template>
  <v-navigation-drawer app expand-on-hover rail>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="fa-solid fa-house"
        title="Dashboard"
        value="dashboard"
        to="/dashboard"
      />
      <v-list-item
        prepend-icon="fa-solid fa-school"
        title="Schools"
        value="schools"
        to="/schools"
      />
      <v-list-item
        prepend-icon="fa-solid fa-chalkboard-user"
        title="Tutors"
        value="tutors"
        to="/tutors"
      />
      <v-list-item
        prepend-icon="fa-solid fa-graduation-cap"
        title="Students"
        value="students"
        to="/students"
      />
      <v-list-item
        prepend-icon="fa-solid fa-briefcase"
        title="Companies"
        value="companies"
        to="/companies"
      />
      <v-list-item
        prepend-icon="fa-solid fa-gear"
        title="Settings"
        value="settings"
        to="/settings"
      />
    </v-list>
  </v-navigation-drawer>
</template>
