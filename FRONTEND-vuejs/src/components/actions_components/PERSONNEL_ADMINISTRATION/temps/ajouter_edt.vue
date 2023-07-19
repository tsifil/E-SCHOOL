<template>
    <div>
        <form>
            <label>Jour</label>
            <VueDatePicker
                class="form-control"
                format="DD"
                :locale="locale"
                @onClose="isVisible = false"
                v-model="jour"
            />
            <br>
            <label>dateHeurePlanDebut</label>
            <input  class="form-control" v-model="dateHeurePlanDebut"  step="1" type="datetime-local"/>

            <!--VueDatePicker
                class="form-control"
                format="YYYY-MM-DD hh:mm"
                :locale="locale"
                @onClose="isVisible = false"
                v-model="dateHeurePlanDebut"
            /-->
            <br>
            <label>dateHeurePlanFin	</label>
            <!--VueDatePicker
                class="form-control"
                :locale="locale"
                @onClose="isVisible = false"
                v-model="dateHeurePlanFin"
                format="D MMMM YYYY HH:mm"
            /-->
            <input class="form-control" id="meetings" v-model="dateHeurePlanFin" step="1" type="datetime-local"/>
            <br>
            <label>idClasse</label>
            <selection v-model="idClasse" :options="classes"/>
            <br>
            <label>codemat</label>
            <selection v-model="codemat" :options="matieres"/>
            <br>
            <label>idProf</label>
            <selection v-model="idProf" :options="profs"/>
        </form>
        <!--button @click="test()">test</button-->
        <button @click="Enregistrer()">Enregistrer</button>
    </div>
</template>
<script>
import moment from 'moment'
import {HTTP} from '../../../../http-constants'
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default {
    components:{VueDatePicker},
    data(){
        return{
            locale: {
                lang: 'fr',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
                /*formats:{
                    LT:'HH:mm',
                    LTS:'HH:mm:ss',
                    L:'DD/MM/YYYY',
                    LLL:'D MMMM YYYY HH:mm',
                    //LLLL:'dddd D MMMM YYYY HH:mm'
                }*/
            },
            idClasse:'',
            codemat:'',
            today:new Date(),
            classes:[],
            matieres:[],
            jour:new Date(),
            dateHeurePlanDebut:'',
            dateHeurePlanFin:'',
            profs:[],
            idProf:''
        }
    },
    methods:{
        t(d){
            const date = new Date(d)
            const day = date.getDay()
            const diff = date.getDate() - day + (day === 0 ? -6 : 1 )
            return new Date(date.setDate(diff))   
        },
        test(){
             const firstDay = this.t(this.today)
             const lastDay = new Date(firstDay)
             lastDay.setDate(lastDay.getDate() + 4)
             const p=moment(firstDay).format("YYYY-MM-DD")
             const d=moment(lastDay).format("YYYY-MM-DD")           
             console.log(p,d)
            /*const today = new Date()
            const first = new Date(today.setDate(today.getDate() - today.getDay()))
            const last = new Date(today.setDate(today.getDate()-today.getDay() + 6))
            console.log(moment(first).format("YYYY-MM-DD"))    
            console.log(last)*/
        },
        Classe(){
            HTTP.get('/professeur/listeClasse').then((response)=>{
                this.classes = response.data
            })
        },
        Matiere(){
                HTTP.get('/professeur/matiere').then((response)=>{
                    this.matieres = response.data
                })
        },
        Professeur(){
            HTTP.get('/professeur/liste').then((response)=>{
                this.profs = response.data
            })
        },
        Enregistrer(){
            const data={
                jour:moment(this.jour).format("DD"),
                dateHeurePlanDebut:moment(this.dateHeurePlanDebut).format("YYYY-MM-DD HH:MM"),
                dateHeurePlanFin:moment(this.dateHeurePlanFin).format("YYYY-MM-DD HH:MM"),
                idClasse:this.idClasse,
                codemat:this.codemat,
                idProf:this.idProf
            }
            HTTP.post('/ajouterEdt',data).then((response)=>{
                console.log(response)
            })
        }
    },
    mounted(){
        this.Classe()
        this.Matiere()
        this.Professeur()
    }
}
</script>
<style>
    #meetings{
        margin:.4rem 0;
    }
</style>