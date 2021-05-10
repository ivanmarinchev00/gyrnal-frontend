let {MenuItems} = '';
if(sessionStorage.getItem('role') === "ADMIN"){
    console.log("THIS MF IS AN ADMIN")
     MenuItems = [
        {
            title: 'Home',
            url: '#',
            cName: 'nav-links'
        },
        {
            title: 'Workouts',
            url: '/Workouts',
            cName: 'nav-links'
        },
        {
            title: 'Admin',
            url: '/Admin',
            cName: 'nav-links'
        },
        {
            title: 'Log out',
            url: '/Logout',
            cName: 'nav-links-mobile'
        },
    ]
}
else{
     MenuItems = [
        {
            title: 'Home',
            url: '#',
            cName: 'nav-links'
        },
        {
            title: 'Workouts',
            url: '/Workouts',
            cName: 'nav-links'
        },
        {
            title: 'Log out',
            url: '/Logout',
            cName: 'nav-links-mobile'
        },
    ]
}
export {MenuItems};
