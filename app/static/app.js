// Toggle Sidebar visibility
const toggleButton = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const closeButton = document.getElementById("close-sidebar");
const overly = document.getElementById("overly");

let isshow = false;

toggleButton.addEventListener("click", () => {
  if (isshow) {
    // Close the sidebar
    overly.classList.remove("bg-opacity-30");
    overly.classList.add("bg-opacity-0");

    sidebar.classList.remove("left-0");
    sidebar.classList.add("left-[-100%]");

    isshow = false;
  } else {
    // Open the sidebar
    overly.classList.remove("bg-opacity-0");
    overly.classList.add("bg-opacity-30");

    sidebar.classList.remove("left-[-100%]");
    sidebar.classList.add("left-0");

    isshow = true;
  }
});

closeButton.addEventListener("click", () => {
  // Close the sidebar when the close button is clicked
  overly.classList.remove("bg-opacity-50");
  overly.classList.add("bg-opacity-0");

  sidebar.classList.remove("left-0");
  sidebar.classList.add("left-[-100%]");

  isshow = false;
});

// hero video model handler
function videoherovideomodelhandler(order) {
  const modelwrap = document.getElementById("herovideomodel");
  const modelwrapifram = modelwrap.querySelector("iframe");

  if (order === "show") {
    modelwrap.classList.remove("opacity-0", "pointer-events-none");
    modelwrapifram.classList.remove("scale-50");
  } else if (order === "hide") {
    modelwrap.classList.add("opacity-0", "pointer-events-none");
    modelwrapifram.classList.add("scale-50");
  }
}
function videoherovideomodelshow() {
  videoherovideomodelhandler("show");
}
function videoherovideomodelclose() {
  videoherovideomodelhandler("hide");
}
