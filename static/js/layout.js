////////////////////////////////////////////////////////////
// sidebar function
////////////////////////////////////////////////////////////
const toggleSidebar = ()=>{
    const sidebar = document.querySelector("#mySidebar");
    const current = sidebar.style.display;
    // console.log(current);
    sidebar.style.display = current == "block" ? "none" : "block";
};
document.querySelectorAll(".toggle-sidebar-btn").forEach((btn)=>{
    btn.addEventListener('click', toggleSidebar);
    // console.log(btn);
});



////////////////////////////////////////////////////////////
// redirect pages
////////////////////////////////////////////////////////////
const goToPage = (pageUrl) => {
    window.location.href = pageUrl;
};
document.querySelector("#btn-index").addEventListener('click', (e)=>{
    goToPage('/');
});
document.querySelector("#btn-epocX").addEventListener('click', (e)=>{
    goToPage('epocX');
});
document.querySelector("#btn-shimmer").addEventListener('click', (e)=>{
    goToPage('shimmer');
});
