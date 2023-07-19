<template>
    <div>
        <ListeMatiere/>
    </div>
</template>
<script>
import ListeMatiere from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/matiere/liste_matiere'

export default{
    components:{ListeMatiere},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>


