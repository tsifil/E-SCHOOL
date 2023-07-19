<template>
  <div>
    <Dashboard/>
  </div>
</template>

<script>

import Dashboard from '../../../components/actions_components/PERSONNEL_ADMINISTRATION/Dashboard.vue'

export default {
  components:{Dashboard},
  async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
 }

</script>