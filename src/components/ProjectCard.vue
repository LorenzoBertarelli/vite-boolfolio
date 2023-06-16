<script>
import { store } from '../store';

export default {
    name: 'ProjectCard',
    props: {
        project: Object
    },
    data() {
        return {
            store,
        }
    },
    computed: {
        contentPreview() {
            if(!this.project.content) {
                return 'Nessun contenuto'
            } else if (this.project.content && this.project.content.length > 150) {
                return this.project.content.substring(0, 150) + "...";
            } else {
                return this.project.content
            }
        },
        imgSrc() {
            if(!this.project.image) return "";
            if(this.project.image.startsWith('http://')) {
                return this.project.image;
            } else {
                return `${this.store.apiBaseUrl}/storage/${this.project.image}`;
            }
        }
    }
}
</script>

<template>
    <div class="card h-100">
        <img v-if="project.image" :src="imgSrc" class="card-img-top" 
        :alt="project.title">
        <div v-else>
            Nessuna immagine presente
        </div>
        <div class="card-body">
            <h4>{{ project.title }}</h4> 
            <p>{{ contentPreview }}</p>
            <p class="text-primary">
                <span v-if="project.type">Tipologia: {{ project.type.name }}</span>
                <span v-else>Nessuna Tipologia</span>
            </p>
            <p class="text">
                <span v-if="project.technologies && project.technologies.length > 0">
                    Tecnologie:
                    <span v-for="(technology, index) in project.technologies" :key="technology.id">
                    {{ technology.name }}
                    <span v-if="index < project.technologies.length - 1">,</span>
                    </span>.
                </span>
                <span v-else>Nessuna Tecnologia</span>
            </p>

            <router-link :to="{ name: 'single-project', params: { slug: project.slug } }" class="btn btn-primary">
                Dettagli
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>