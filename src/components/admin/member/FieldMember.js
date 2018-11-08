export default [
    {
        name: 'full_name',
        title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
        sortField: 'full_name'
    },
    {
        name: 'age',
        sortField: 'age',
        title:'Age'
    },
    {
        name: 'identify_number',
        title:'Identify Number'
    },
    {
        name: 'info_vcd_rental',
        title:'Info'
    },
    {
        name: 'is_active',
        formatter: (value) => {
            return value === '1' ? 'Active' : 'Pending'
        }
    },
    'actions'
]