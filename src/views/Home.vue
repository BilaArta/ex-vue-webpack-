<template>
  <div>
      <v-row
        class="pa-4"
      >
        <v-col
            name="User"
            cols="4"
        >
            <v-card
                elevation="4"
                tile
                class="pa-4"
            >
                <v-card-title>User Profile</v-card-title>
                <v-card-subtitle class="black--text">Name : {{user.name}}</v-card-subtitle>
                <v-card-subtitle class="black--text mt-n8">Email : {{user.email}}</v-card-subtitle>

                <v-card-title class="mb-n4">History rating</v-card-title>
                <v-simple-table
                    fixed-header
                    height="200px"
                >
                    <thead>
                        <tr>
                        <th class="text-left">
                            Movies
                        </th>
                        <th class="text-center">
                            Rating Value
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, i) in user.movieRated"
                        :key="i"
                        >
                        <td>{{ item.Name }}</td>
                        <td class="text-center">{{ item.ratingVal }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>

                <v-card-title class="mb-n4">Recommended Movies</v-card-title>
                <v-simple-table
                    fixed-header
                    height="600px"
                    
                >
                    <thead>
                        <tr>
                        <th class="text-left">
                            Movies
                        </th>
                        <th class="text-center">
                            Score
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in recommendation"
                        :key="item.id"
                        >
                        <td>{{ item.name }}</td>
                        <td class="text-center">{{ item.score }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-col>
        <v-col
            name="Movies"
            cols="8"
        >
            <v-dialog
                v-model="dialog"
                hide-overlay
                persistent
                width="400"
            >
                <v-card
                    color="grey"
                    dark
                >
                    <v-card-text>
                    Rating...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-card
                tile
                elevation="4"
                
                color="#f1f2f6"
            >
                <v-card-title>
                    Movies
                    <v-spacer></v-spacer>
                    <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    ></v-text-field>
                </v-card-title>
                <hr>
                <v-data-table
                    item-key="Movie"
                    class="elevation-1"
                    loading-text="Loading... Please wait"
                    :headers="headers"
                    :items="movies"
                    :page.sync="page"
                    :loading="loading"
                    :items-per-page="itemsPerPage"
                    :search="search"
                    hide-default-footer
                >
                    <template v-slot:item="{ item }">
                        <tr id="movies">
                            <td>{{item.Name}}</td>
                            <td class="text-truncate" style="max-width: 350px;">{{item.Overview}}</td>
                            <td>{{item["Release Date"]}}</td>
                            <td>{{item.Genre}}</td>
                            <td>
                                <v-rating
                                    background-color="grey"
                                    color="warning"
                                    length="5"
                                    size="20"
                                    :value="ratingVal"
                                    v-model="rating[item.Name]"
                                ></v-rating>
                                <v-btn 
                                    block 
                                    small
                                    class="mb-4"
                                    @click="btnRating(item)"
                                >
                                OK
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                    
                </v-data-table>
                <hr>
            <div class="text-center pa-2">
                <v-container>

                <v-pagination
                    v-model="page"
                    :length="pageCount"
                ></v-pagination>
                </v-container>
            </div>
            </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { postUsers, apiMovie } from "@Plugins/api.js";
export default {
    data : () => ({
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        user : {},
        loading: true,
        rating : {},
        ratingVal: 0,
        recommendation : [],
        dialog: false,
        search: "",
        headers: [
            {
                text: 'Movie',

                value: 'Name',
                sortable: true,
            },
            { 
                text: 'Overview', 
                value: 'Overview',

            },
            { 
                text: 'Released Date',

                value: 'Release Date' 
            },
            { 
                text: 'Genre',

                value: 'Genre' 
            },
            { 
                text: 'Rating', 

                value: 'actions',
            },

        ],
        movies:[]

    }),
    methods : {
        async getUser(params){
            let data = await postUsers.getOneUser(params.id)
            return data
        },
        async getMovies(page, size){
            // console.log(page, size);
            let data = await apiMovie.getAllMovie({'page' : page, 'size' : size}) 
            console.log(data);
            return data
        },
        async getRecommendation(id, size){
            let data = await apiMovie.getRecommendation({id, 'size' : size}) 
            // console.log(data);
            return data
        },
        btnRating(item){
            if(this.rating[item.Name] != null){
                this.dialog = true;
                const data = {
                    movie_name : item.Name,
                    user_email : this.user.email,
                    rating : this.rating[item.Name],
                }
                console.log(data);
                postUsers.userRating(data).then(result => {
                    console.log(result)
                    return result
                }).catch(err => console.log(err))
                this.dialog = false
            }
        }
    },
    created(){
        this.getUser(this.$route.params).then(
            result => {
                this.user = result
            }
        ).catch(err => console.log(err))
        
        this.getMovies(this.page, this.itemsPerPage).then(
            result => {
                this.movies = result.docs
                this.pageCount = result.totalPages
                this.loading = false;
            }
        )
        this.getRecommendation(this.$route.params, 10).then(
            result => {
                console.log(result);
                this.recommendation = result
            }
        ).catch(err => alert(err))
    },
    watch :{
        page(){
            this.loading = true
            this.getMovies(this.page, this.itemsPerPage).then(
                result => {
                    this.movies = result.docs
                    this.totalPages = result.totalPages
                    this.loading = false;
                }
            )
        },
    }
}
</script>

<style>

/* .v-pagination li:hover{ 
    color: red;
} */

</style>