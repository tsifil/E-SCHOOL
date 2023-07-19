<template>
    <div>
        <afficher_note_eleveVue/>
    </div>
</template>
<script>
import afficher_note_eleveVue from '../../../../components/actions_components/PROFESSEUR/notes/afficher_note_eleve.vue';

export default {
    components:{afficher_note_eleveVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>