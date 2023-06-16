<script>
import axios from 'axios';
import { store } from '../store';

    export default {
        name: "SingleProjectPage",
        data() {
            return {
                store,
                project: null,
                errorMessage: ""
            }
        },
        mounted() {
            const slug = this.$route.params.slug;
            axios.get(`${this.store.apiBaseUrl}/api/projects/${slug}`).then(resp => {
                this.project = resp.data.results
            }, error => {
                if(error.response.status === 404) {
                    //Errore not found, sto cercando un progetto che non esiste
                    //rindirizzo nella pagina not found
                    this.$router.push({name: "not-found"});
                } else {
                    this.errorMessage = "Oops, Qualcosa è andato storto!";
                }
            })
        },
        computed: {
            imgSrc() {
                // Se project image inizia con https://, ritorna project.image
                // Altrimenti ritorna ${store.apiBaseUrl}/storage/${project.image} 
                if (!this.project.image) return "";
                if (this.project.image.startsWith('https://')) {
                    return this.project.image;
                } else {
                    return `${this.store.apiBaseUrl}/storage/${this.project.image}`;
                }
            }
        },
    }
</script>

<template>
    <div class="container">
        <div class="project-details" v-if="project">
            <h2>{{ project.title }}</h2>
            <p>Tipologia: {{ project.type ? project.type.name : "Nessuna tipologia presente" }}.</p>
            <p>Tecnologia: {{ project.technologies.length
                ? project.technologies.map(tech => tech.name).join(', ') 
                : "Nessuna tecnologia presente" }}.
             </p>
            <img class="w-25" :src="imgSrc" alt="">
            <p>{{ project.content }}</p>
        </div>
    </div>
</template>

<style lang="sass" scoped>

</style>