// listing element
document.getElementById("resumeForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    // type assertion

    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const experienceElement = document.getElementById("experience") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;


    // milestone5 task1
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;





    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      // milestone5 task1
      usernameElement

    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

      const username = usernameElement.value;
      const uniquePath = `resumes/${username.replace(/\s+/g,'_')}_cv.html`



      // picture element
      const profilePictureFile = profilePictureInput.files?.[0]
      const profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
      

      // create resume output
      const resumeHTML = `
    <h2>Resume</h2>
    ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="profilePicture" class="profilePicture">`: ""}
    <p><strong>Name:</strong><span id="edit-name" class="editable">${name}</span></p>
    <p><strong>Email:</strong><span id="edit-edit" class="editable">${email}</span></p>
    <p><strong>Phone Number:</strong><span id="edit-phone" class="editable">${phone}</span></p>
    
    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>
    
    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;


      //milestone 5 
      const resumeOutputElement = document.getElementById("resumeOutput");
      if(resumeOutputElement){
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hiden");
        // create container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        //add download pdf
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", ()=>{
          window.print(); // open the print dialogue allowing user to save as pdf

        });
        buttonsContainer.appendChild(downloadButton);

        //add sharable link
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Sharable Link";
        shareLinkButton.addEventListener("click", async ()=>{
          try{
            // create a unique sharable link(simulate it in this case)
            const sharableLink = `https://yourdomain.com/resumes/${encodeURIComponent( name.replace(
              /\s+/g,
              "_"
            ))}_cv.html`;

            //use Clipboard API to copy the sharable link
            await navigator.clipboard.writeText(sharableLink);
            alert("Sharable link copied to clipboard!");
          } catch(err){
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link. Please try again!");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
}else{
  console.error("resumeOutput container not found");
}
    } else {
      console.error("form elements are missing");
    }
  });