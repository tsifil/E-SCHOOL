<template>
    <div>
        <ConsulterCoefficient/>
    </div>
</template>

<script>
import ConsulterCoefficient from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/matiere/consulter_coefficient'

export default {
    components:{ConsulterCoefficient},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>