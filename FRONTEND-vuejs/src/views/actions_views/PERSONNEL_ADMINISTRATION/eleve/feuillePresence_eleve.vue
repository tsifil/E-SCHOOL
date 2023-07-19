<template>
    <div>
        <feuillePresence_eleve/>
    </div>
</template>
    
<script>
    import feuillePresence_eleve from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/EleveListe'
        export default{
            components:{feuillePresence_eleve},
            async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
        }
</script>