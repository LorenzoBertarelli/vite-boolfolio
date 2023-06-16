<script>
    export default {
        name: 'Pagination',
        props: {
            currentPage: Number,
            lastPage: Number
        },
        emits: ['changePage']
    }
</script>

<template>
    <nav v-if="lastPage" class="mt-4 d-flex justify-content-center" aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': currentPage === 1}">
                <a @click.prevent="$emit('changePage', currentPage - 1)" class="page-link" href="#">Previous</a>
            </li>
            <li 
                class="page-item" :class="{'active': pageNum === currentPage}" 
                @click.prevent="$emit('changePage', pageNum)" v-for="pageNum in lastPage">
                <a class="page-link" href="#">{{ pageNum }}</a>
            </li>
            <li class="page-item" :class="{'disabled': currentPage === lastPage}">
                <a @click.prevent="$emit('changePage', currentPage + 1)" class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<style lang="sass" scoped>

</style>