<template>
    <div>
      <editer_classe/>
    </div>
  </template>
  
  <script>
  
  import editer_classe from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/classe/editer_classe.vue'
  
  export default {
    components:{editer_classe},
    async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
   }
  
  </script>