import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Navigation from '../components/admin/Navigation'
import ListMember from '../components/admin/member/List'
import AddMember from '../components/admin/member/Create'
import ListContact from  '../components/admin/contact/List'
import BaseAxios from "../services/BaseAxios";

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!localStorage.getItem('user-token')) {
        next()
        return
    }
    next('/list-member')
}

const ifAuthenticated = (to, from, next) => {
    BaseAxios.get('user',{
        headers: { Authorization: "Bearer " + localStorage.getItem('user-token') }
    }).then(res=>{
        console.log(res);
        next()
        return
    }).catch(err=>{
        console.log(err);
        localStorage.removeItem('user-token');
        next('/login')
    });
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Navigation,
            children:[
                { path: '/list-member', component: ListMember },
                { path: '/add-member', component: AddMember },
                { path: '/edit-member/:id', component: AddMember },
                { path: '/list-contact', component: ListContact}
            ],
            beforeEnter: ifAuthenticated
        },

    ],
})
