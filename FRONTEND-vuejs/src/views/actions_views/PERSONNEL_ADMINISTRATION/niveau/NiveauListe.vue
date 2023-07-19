<template>
    <div>
        <NiveauListe/>
    </div>
</template>

<script>
import NiveauListe from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/niveau/NiveauListe.vue';
    export default{
        components:{NiveauListe},
     async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
    }
</script>