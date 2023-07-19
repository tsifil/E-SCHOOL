<template>
    <div>
        <editer_noteVue/>
    </div>
</template>
<script>
import editer_noteVue from '../../../../components/actions_components/PROFESSEUR/notes/editer_note.vue';
export default {
    components:{editer_noteVue},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf){
                    this.$router.push('/connecter_professeur')
            }
    }
}
</script>