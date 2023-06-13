<script>
export default {
    name: 'ProjectCard',
    props: {
        project: Object
    },
    data() {
        return {
            baseUrl: "http://localhost:8000",
        }
    }
}
</script>

<template>
    <div class="card h-100">
        <img v-if="project.image" src="`${baseUrl}/storage/${project.image}`" class="card-img-top" 
        :alt="project.title">
        <div v-else>
            Nessuna immagine presente
        </div>
        <div class="card-body">
            <h4>{{ project.title }}</h4>  
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>