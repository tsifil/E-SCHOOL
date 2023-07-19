<template>
    <div>
        <voir_noteVue/>
    </div>
</template>
<script>
import voir_noteVue from '../../../../components/actions_components/PROFESSEUR/notes/voir_note.vue';

export default {
    components:{voir_noteVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>