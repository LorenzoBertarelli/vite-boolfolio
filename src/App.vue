<script>
import axios from 'axios';
import ProjectCard from './components/ProjectCard.vue';
import { store } from './store';

export default {
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
        ProjectCard 
    }
}
</script>

<template>
  <div class="container">
    <section v-if="!loading">
        <h2>Lista dei Progetti</h2>
        <div class="text-end">
            Troavti {{ totalProjects }} Progetti
        </div>
        <div class="row row-cols-4 g-3">
        <div class="col" v-for="project in projects" :key="project.id">
        <ProjectCard :project="project"/>
        </div>
        </div>
        <nav v-if="lastPage" class="mt-4 d-flex justify-content-center" aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': currentPage === 1}"><a @click.prevent="getProject(currentPage - 1)" class="page-link" href="#">Previous</a></li>
                <li 
                    class="page-item" :class="{'active': pageNum === currentPage}" 
                    @click.prevent="getProject(pageNum)" v-for="pageNum in lastPage">
                    <a class="page-link" href="#">{{ pageNum }}</a>
                </li>
                <li class="page-item" :class="{'disabled': currentPage === lastPage}"><a @click.prevent="getProject(currentPage + 1)" class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    </section>
    <section v-else="loading" class="text-center mt-5">
        <h2>Stiamo caricando i progetti...</h2>
    </section>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>