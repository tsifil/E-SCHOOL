<template>
  <div>
    <NouveauEleve/>
  </div>
</template>

<script>

import NouveauEleve from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/Nouveau_eleve'

export default {
  components:{NouveauEleve},
  async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
 }

</script>