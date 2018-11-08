<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
                v-model="packageType"
                :items="packageList"
                :rules="[v => !!v || 'This field is required']"
                label="Package Type"
                required
        ></v-select>

        <v-text-field
                v-model="fullName"
                :rules="fullNamRules"
                label="Full Name"
                required
        ></v-text-field>

        <v-text-field
                v-model="phoneNumber"
                :rules="phoneNumberRoles"
                label="Phone Number"
                required
        ></v-text-field>

        <v-textarea
                v-model="address"
                :rules="addressRules"
                label="Address"
                required
        ></v-textarea>
        <v-text-field
                v-model="age"
                type="number"
                :rules="ageRules"
                label="Age"
                required
        ></v-text-field>

        <v-text-field
                v-model="identifyNumber"
                :rules="identifyNumberRules"
                label="Identify Number"
                required
        ></v-text-field>

        <v-select
                v-model="isMemberAnotherVCDRental"
                :items="yesNo"
                :rules="[v => !!v || 'This field is required']"
                label="Is member another VCD rental"
                required
        ></v-select>

        <v-select
                v-model="infoVCDRental"
                :items="['Friend','Newspaper','Broadside']"
                :rules="[v => !!v || 'This field is required']"
                label="Info VCD rental"
                required
        ></v-select>
        <h3>Contact</h3>
        <v-layout row wrap v-for="contact in listContact" :key="`6${contact.id}`">
            <v-flex xs6>
                <v-text-field
                        v-model="contact.name"
                        label="Contact Name"
                ></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field
                        v-model="contact.phone_number"
                        label="Phone Number"
                        type="number"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addMoreContact" color="info">Add More Contact</v-btn>
        </v-card-actions>

        <v-card-actions>
            <v-btn :disabled="!valid" @click="submit" color="primary" block>{{buttonName}}</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
    import BaseAxios from "../../../services/BaseAxios";
    export default {
        name: "Create",
        data: () => ({
            buttonName:'Submit',
            valid : false,
            yesNo: ['No', 'Yes'],
            fullName: '',
            fullNamRules: [
                v => !!v || 'Full Name is required'
            ],
            phoneNumber:'',
            phoneNumberRoles: [
                v => !!v || 'Phone Number is required'
            ],
            address: '',
            addressRules: [
                v => !!v || 'address is required'
            ],
            age:'',
            ageRules:[
                v => !!v || 'Age is required',
                v => !isNaN(v) ||'Age not valid',
                v => !(v<4 || v>90) || 'Minimum 5 years and maximum 90 years'
            ],
            identifyNumber:'',
            identifyNumberRules: [
                v => !!v || 'Identify Number is required'
            ],
            isMemberAnotherVCDRental:null,
            infoVCDRental:null,
            packageType:null,
            packageList:[],
            listContact:[
                {
                    id:0,
                    name:'',
                    phone_number:''
                },
                {
                    id:1,
                    name:'',
                    phone_number:''
                }
            ]
        }),
        created(){
          BaseAxios.get('package').then(res=>{
              console.log(res.data);
              this.packageList = res.data.data.map(obj=>{
                  return obj.name
              });
              console.log(this.packageList);
          }).catch(err=>{
              console.log(err);
          });

          if(this.$route.params.id !== undefined)
          {
              BaseAxios.get(`members/${this.$route.params.id}/edit`).then(res=>{
                    if(res.data.data) {
                        this.fullName = res.data.data.full_name
                        this.phoneNumber = res.data.data.phone_number
                        this.address = res.data.data.address
                        this.age = res.data.data.age
                        this.identifyNumber = res.data.data.identify_number
                        this.isMemberAnotherVCDRental = (res.data.data.is_member_another_vcd_rental===0) ? 'No' :'Yes'
                        this.infoVCDRental = res.data.data.info_vcd_rental
                        this.packageType = res.data.data.package.name
                        this.buttonName = 'Update'
                        this.listContact = res.data.data.contacts
                        for(let i=2-res.data.data.contacts.length;i>0;i--){
                            console.log(res.data.data.contacts.length);
                            this.listContact.push({
                                id:Math.random(),
                                name:'',
                                phone_number:''
                            });
                            console.log(this.listContact.length);
                        }
                    } else {
                        this.$router.push('/list-member');
                    }
              }).catch(err=>{
                  console.log(err);
                  this.$router.push('/list-member');
              })
          }
        },
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    var dataPost = {
                        full_name : this.fullName,
                        phone_number:this.phoneNumber,
                        address : this.address,
                        age: this.age,
                        identify_number: this.identifyNumber,
                        is_member_another_vcd_rental: this.isMemberAnotherVCDRental,
                        info_vcd_rental: this.infoVCDRental,
                        package_id: this.packageType,
                        contacts: this.listContact
                    };
                    if(this.$route.params.id !== undefined) {
                        BaseAxios.put(`members/${this.$route.params.id}`,dataPost,{
                            headers:{
                                Authorization: 'Bearer '+ localStorage.getItem('user-token')
                            }
                        }).then(res=>{
                            console.log(res);
                            if(res.data.code===200){ //succes
                                this.$router.push('/list-member');
                            }else{
                                this.$swal('Something wrong!!!');
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else{
                        BaseAxios.post('members',dataPost,{
                            headers:{
                                Authorization: 'Bearer '+ localStorage.getItem('user-token')
                            }
                        }).then(res=>{
                            console.log(res);
                            if(res.data.code===200){ //succes
                                this.$router.push('/list-member');
                            }else{
                                this.$swal('Something wrong!!!');
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }
            },
            clear () {
                this.$refs.form.reset()
            },
            addMoreContact(){
                this.listContact.push({
                    id:Math.random(),
                    name:'',
                    phone_number:''
                })
            }
        }
    }
</script>

<style scoped>

</style>