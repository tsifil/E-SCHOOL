<template>
    <div>
        <NouveauMatiere/>
    </div>
</template>
<script>
import NouveauMatiere from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/matiere/nouveau_matiere.vue'

export default{
    components:{NouveauMatiere},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>


