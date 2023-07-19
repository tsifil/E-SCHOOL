<template>
    <div>
        <NouveauTrimestre/>
    </div>
    </template>
    
    <script>
    import NouveauTrimestre from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/trimestre/nouveau_trimestre.vue'
        
        export default{
            components:{NouveauTrimestre},
            async created(){
                if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                        this.$router.push('/connecter_personnel_administration')
                }
            }
        }
    </script>