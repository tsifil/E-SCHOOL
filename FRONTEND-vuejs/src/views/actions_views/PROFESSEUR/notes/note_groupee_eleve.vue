<template>
    <div>
        <note_groupee_eleveVue/>
    </div>
</template>
<script>
import note_groupee_eleveVue from '../../../../components/actions_components/PROFESSEUR/notes/note_groupee_eleve.vue';
export default {
    components:{note_groupee_eleveVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>