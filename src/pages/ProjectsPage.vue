<script>
    import axios from 'axios';
    import { store } from '../store';
    import Pagination from '../components/Pagination.vue';
    import ProjectCard from '../components/ProjectCard.vue';

    export default {
        name: 'ProjectsPage',
        data() {
            return {
                projects: [],
                currentPage: 1,
                lastPage: null,
                totalProjects: 0,
                loading: false,
                store
            };
        },
        mounted() {
            this.getProject();
        },
        methods: {
            getProject(pageNumber = 1) {
                this.loading = true;
                axios.get(`${store.apiBaseUrl}/api/projects`, {
                    params: {
                        page: pageNumber
                    }
                }).then(resp => {
                    this.projects = resp.data.results.data;
                    this.currentPage = resp.data.results.current_page;
                    this.lastPage = resp.data.results.last_page;
                    this.totalProjects = resp.data.results.total;
                }).finally(() => {
                    this.loading = false
                })
            }
        },
        components: {
            Pagination,
            ProjectCard
        }
    }
</script>

<template>
  <div class="container">
    <section v-if="!loading">
        <h2>Lista dei Progetti</h2>
        <div class="text-end">
            Trovati {{ totalProjects }} Progetti
        </div>
        <div class="row row-cols-4 g-3">
            <div class="col" v-for="project in projects" :key="project.id">
            <ProjectCard :project="project"/>
            </div>
        </div>
        <Pagination :currentPage="currentPage" :lastPage="lastPage" 
        @changePage="getProject" />
    </section>
    <section v-else="loading" class="text-center mt-5">
        <h2>Stiamo caricando i progetti...</h2>
    </section>
  </div>
</template>

<style lang="sass" scoped>

</style>