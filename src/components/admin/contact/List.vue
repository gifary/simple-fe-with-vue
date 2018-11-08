<template>
    <v-layout column="true">
        <v-flex>
            <v-data-table
                    :headers="headers"
                    :items="contacts"
                    :pagination.sync="pagination"
                    :total-items="totalContacts"
                    :loading="loading"
                    class="elevation-1"
                    :rows-per-page-items="[20]"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.phone_number }}</td>
                    <td class="text-xs-left">{{ (props.item.member.length>0) ? props.item.member[0].full_name : '-' }}</td>
                    <td class="text-xs-left">{{ (props.item.member.length>0) ? props.item.member[0].address :'-' }}</td>
                    <td class="text-xs-left">{{ (props.item.member.length>0) ? props.item.member[0].phone_number : '-' }}</td>
                    <td class="text-xs-left">{{ (props.item.member.length>0) ? convertDate(props.item.member[0].created_at) : '-' }}</td>
                    <td class="justify-center">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
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
                totalContacts: 0,
                contacts: [],
                loading: true,
                pagination: {
                    rowsPerPage:20,
                    page:1
                },
                headers: [
                    {
                        text: 'Name',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Phone Number',
                        sortable: false,
                        value: 'phone_number'
                    },
                    {
                        text: 'Member Name',
                        sortable: false,
                        value: 'member[0].full_name'
                    },
                    {
                        text: 'Address',
                        sortable: false,
                        value: 'member[0].address'
                    },
                    {
                        text: 'Member Phone Number',
                        sortable: false,
                        value: 'member[0].phone_number'
                    },
                    {
                        text: 'Registration Date',
                        sortable: false,
                        value: 'member[0].crated_at'
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
                BaseAxios.get('contacts',{
                    headers:{
                        Authorization: 'Bearer '+ localStorage.getItem('user-token')
                    }
                }).then(res=>{
                    this.totalContacts = res.data.data.length
                    this.contacts = res.data.data
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
                if(confirm('Are you sure you want to confirm this contact?'))
                {
                    const index = this.contacts.indexOf(item);
                    this.contacts.splice(index,1);
                    BaseAxios.put('contact/'+item.id,null,{
                        headers:{
                            Authorization: 'Bearer '+ localStorage.getItem('user-token')
                        }
                    }).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>