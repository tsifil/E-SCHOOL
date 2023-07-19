<template>
    <div>
        <Trimestre/>
    </div>
</template>

<script>
import Trimestre from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/trimestre/trimestre.vue'
export default{
  components:{Trimestre},
  async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }   
}
</script>
