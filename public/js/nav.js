import '../scss/styles.scss'
const searchBtn=document.getElementById("search-btn");
const searchInput=document.getElementById("search-input");
const loadMore=document.getElementById("load-more");
const spinner=document.getElementById("spinner");
const toggleLinks=document.getElementById("navbarNav");
const toggleBtn=document.getElementById("toggle-btn");
const profileLinks=document.getElementById("profile-links");
const profileLinks2=document.getElementById("profile-links2");
const profileLinksBtn=document.getElementById("profile-links-btn");
const profileLinksBtn2 = document.getElementById("profile-links-btn2");





searchBtn.addEventListener('click',()=>{
    if(searchInput.classList.contains("d-none"))
{
  searchInput.classList.remove("d-none");
  searchInput.focus();

}    else 
    searchInput.classList.add("d-none");
}) 
profileLinksBtn.addEventListener('click',()=>{
  if(profileLinks.classList.contains("show"))
{
  profileLinks.classList.remove("show");

}    else 
profileLinks.classList.add("show");
})
profileLinksBtn2.addEventListener('click',()=>{
  if(profileLinks2.classList.contains("show"))
{
  profileLinks2.classList.remove("show");

}    else 
profileLinks2.classList.add("show");
}) 









