<template>
  <div>
    <Dashboard/>
  </div>
</template>

<script>

import Dashboard from '../../../components/actions_components/PARENT/Dashboard.vue'

export default {
  components:{Dashboard},
  async created(){
            if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire){
                    this.$router.push('/connecter_parent')
            }
    }
 }

</script>