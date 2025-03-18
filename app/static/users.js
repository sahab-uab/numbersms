// toggle profile menu
function toggleprofile(id) {
  let target = document.getElementById(id);
  target.classList.toggle("pointer-events-none");
  target.classList.toggle("opacity-0");
}

// toggle sidebbar
function showsidebar(id){
  let target = document.getElementById(id)
  target.classList.toggle('left-[-100%]')
}