<template>
  <v-navigation-drawer app expand-on-hover rail>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="fa-solid fa-house"
        title="Dashboard"
        value="dashboard"
        to="/dashboard"
        exact
      />
      <v-list-item
        prepend-icon="fa-solid fa-school"
        title="Schools"
        value="schools"
        to="/schools"
        exact
      />
      <v-list-item
        prepend-icon="fa-solid fa-chalkboard-user"
        title="Tutors"
        value="tutors"
        to="/tutors"
        exact
      />
      <v-list-item
        prepend-icon="fa-solid fa-graduation-cap"
        title="Students"
        value="students"
        to="/students"
        exact
      />
      <v-list-item
        prepend-icon="fa-solid fa-briefcase"
        title="Companies"
        value="companies"
        to="/companies"
        exact
      />
      <v-list-item
        prepend-icon="fa-solid fa-link"
        title="InternshipAssignment"
        value="internshipassignment"
        to="/internshipassignment"
        exact
      />
      <v-list-item
        prepend-icon="fa-solid fa-gear"
        title="Settings"
        value="settings"
        to="/settings"
        exact
      />
    </v-list>
  </v-navigation-drawer>
</template>
