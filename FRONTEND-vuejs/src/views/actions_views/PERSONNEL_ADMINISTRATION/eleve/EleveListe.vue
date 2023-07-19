<template>
    <div>
        <ListeEleve/>
    </div>
    </template>
    
    <script>
    import ListeEleve from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/eleve/EleveListe'
        
        export default{
            components:{ListeEleve},
            async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        }
        }
    </script>