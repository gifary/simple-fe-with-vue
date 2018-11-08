<template>
    <v-layout column="true">
        <v-flex text-xs-right>
            <v-btn color="primary" :to="'/add-member'">Add Member</v-btn>
        </v-flex>

        <v-flex>
            <v-data-table
                    :headers="headers"
                    :items="members"
                    :pagination.sync="pagination"
                    :total-items="totalMember"
                    :loading="loading"
                    class="elevation-1"
                    :rows-per-page-items="[20]"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.full_name }}</td>
                    <td class="text-xs-left">{{ props.item.package.name }}</td>
                    <td class="text-xs-left">{{ props.item.identify_number }}</td>
                    <td class="text-xs-left">{{ props.item.info_vcd_rental }}</td>
                    <td class="text-xs-left">{{ convertDate(props.item.created_at) }}</td>
                    <td class="text-xs-left">{{ (props.item.is_active===1) ? 'Active' : 'Pending' }}</td>
                    <td class="justify-center">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import BaseAxios from "../../../services/BaseAxios";
    export default {
        name: "List",
        data () {
            return {
                totalMember: 0,
                members: [],
                loading: true,
                pagination: {
                    rowsPerPage:20,
                    page:1
                },
                headers: [
                    {
                        text: 'Name',
                        sortable: false,
                        value: 'full_name'
                    },
                    {
                        text: 'Package',
                        sortable: false,
                        value: 'package.name'
                    },
                    {
                        text: 'Identify Number',
                        sortable: false,
                        value: 'identify_number'
                    },
                    {
                        text: 'Info',
                        sortable: false,
                        value: 'info_vcd_rental'
                    },
                    {
                        text: 'Registration Date',
                        sortable: false,
                        value: 'crated_at'
                    },
                    {
                        text: 'Active',
                        sortable: false,
                        value: 'is_active'
                    },
                    { text: 'Actions', value: 'id', sortable: false }
                ]
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getDataFromApi()
                },
                deep: true
            }
        },
        mounted () {
            this.getDataFromApi()
        },
        methods: {
            getDataFromApi () {
                this.loading = true
                console.log(this.pagination)
                BaseAxios.get('members?page='+this.pagination.page,{
                    headers:{
                        Authorization: 'Bearer '+ localStorage.getItem('user-token')
                    }
                }).then(res=>{
                    this.totalMember = res.data.data.total
                    this.members = res.data.data.data
                    this.loading = false
                }).catch(err=>{
                    console.log(err);
                });
            },
            convertDate(value){
                let date =  new Date(value);
                return date.toDateString();
            },
            editItem(item){
                console.log(item);
                this.$router.push('/edit-member/'+item.id);
            },
            deleteItem(item){
                if(confirm('Are you sure you want to delete this member?'))
                {
                    const index = this.members.indexOf(item)
                    this.members.splice(index,1)
                    BaseAxios.delete('members/'+item.id,null,{
                        headers:{
                            Authorization: 'Bearer '+ localStorage.getItem('user-token')
                        }
                    }).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>