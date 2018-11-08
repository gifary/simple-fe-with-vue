<template>
    <v-app id="app">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field prepend-icon="email"
                                                  v-model="email"
                                                  :rules="emailRules"
                                                  name="email"
                                                  label="Email"
                                                  required
                                                  type="text">
                                    </v-text-field>
                                    <v-text-field
                                            v-model="password"
                                            :rules="passwordRules"
                                            id="password"
                                            prepend-icon="lock"
                                            name="password"
                                            label="Password"
                                            required
                                            type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                    <v-btn :disabled="!valid" @click="submit" color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import BaseAxios from '../../services/BaseAxios'
export default {
    name: "Login",
    data: () => ({
        valid : false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required'
        ]
    }),
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                BaseAxios.post('login',{email:this.email,password:this.password}).then(res=>{
                    console.log(res.data);
                    if(res.data.code===200){
                        localStorage.setItem('user-token',res.data.data.token);
                        this.$router.push('/list-member');
                    }else{
                        this.$swal('Email or password wrong!!!');
                        localStorage.removeItem('user-token');
                    }
                }).catch(err=>{
                    this.$swal('Email or password wrong!!!');
                    localStorage.removeItem('user-token');
                })
            }
        },
        clear () {
            this.$refs.form.reset()
        }
    }
}
</script>

<style scoped>

</style>