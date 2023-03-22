// Retrieve the form element and profile list div
const form = document.getElementById('form');
const profileList = document.getElementById('profile-list');

// Add event listener to the form submission
form.addEventListener('submit', addProfile);

// Check if there are any existing profiles in local storage
let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

// Loop through the profiles and display them in the profile list div
for (let i = 0; i < profiles.length; i++) {
  displayProfile(profiles[i]);
}

// Function to handle adding a new profile
function addProfile(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const picture = document.getElementById('picture').value;

  // Create a new profile object
  const profile = {
    name,
    email,
    phone,
    address,
    picture
  };

  // Add the profile to the profiles array
  profiles.push(profile);

  // Store the updated profiles array in local storage
  localStorage.setItem('profiles', JSON.stringify(profiles));

  // Display the new profile in the profile list div
  displayProfile(profile);

  // Reset the form
  form.reset();
}

// Function to display a profile in the profile list div
// Function to display a profile in the profile list div
function displayProfile(profile) {
  // Create a new div element to hold the profile information
  const profileDiv = document.createElement('div');
  profileDiv.classList.add('profile');
  //add image if exsist and true//
  if (profile.picture) {
    const pictureImg = document.createElement('img');
    pictureImg.src = profile.picture;
    profileDiv.appendChild(pictureImg);
  }

  // Add the profile name as a heading
  const heading = document.createElement('h2');
  heading.textContent = profile.name;
  profileDiv.appendChild(heading);

  // Add the profile email, phone number, and address as paragraphs
  const emailPara = document.createElement('p');
  emailPara.textContent = `Email: ${profile.email}`;
  profileDiv.appendChild(emailPara);

  const phonePara = document.createElement('p');
  phonePara.textContent = `Phone: ${profile.phone}`;
  profileDiv.appendChild(phonePara);

  const addressPara = document.createElement('p');
  addressPara.textContent = `Address: ${profile.address}`;
  profileDiv.appendChild(addressPara);

  // Add the profile picture as an image element, if it exists
  

  // Add an edit button to the profile
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Profile';
  editBtn.addEventListener('click', () => {
    // Populate the form fields with the profile information
    document.getElementById('name').value = profile.name;
    document.getElementById('email').value = profile.email;
    document.getElementById('phone').value = profile.phone;
    document.getElementById('address').value = profile.address;
    document.getElementById('picture').value = profile.picture;

    // Disable the add profile button and enable the edit profile button
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('edit-btn').disabled = false;
  });
  profileDiv.appendChild(editBtn);
  function deleteProfile(profile) {
    // Find the index of the profile in the profiles array
    const index = profiles.findIndex(p => p === profile);
  
    // Remove the profile from the profiles array
    profiles.splice(index, 1);
  
    // Store the updated profiles array in local storage
    localStorage.setItem('profiles', JSON.stringify(profiles));
  
    // Remove the profile from the profile list div
   
    
  }
  

  // Add a delete button to the profile
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Profile';
  deleteBtn.addEventListener('click', () => {
    deleteProfile(profile);
    location.reload(alert("Profile Deleted SucssesFully"));
  });
  profileDiv.appendChild(deleteBtn);

  // Add the profileDiv to the profile list div
  const profileListDiv = document.getElementById('profile-list');
profileListDiv.appendChild(profileDiv);
}


// Add event listener to the edit profile button
document.getElementById('edit-btn').addEventListener('click', editProfile);

// Function to handle editing a profile
function editProfile() {
  // Retrieve the form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const picture = document.getElementById('picture').value;

  // Retrieve the index of the profile being edited
  const index = profiles.findIndex(profile => profile.name === name);

  // Check if email field is not empty
  if (email.trim() !== '') {
    // Update the profile object with the new values
    profiles[index].email = email;
    profiles[index].phone = phone;
    profiles[index].address = address;
    profiles[index].picture = picture;

    // Store the updated profiles array in local storage
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Clear the form fields
    form.reset();

    // Enable the add profile button and disable the edit profile button
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('edit-btn').disabled = true;

    // Remove all profiles from the profile list div
    while (profileList.firstChild) {
      profileList.removeChild(profileList.firstChild);
    }

    // Loop through the profiles and display them in


// Loop through the profiles and display them in the profile list div
for (let i = 0; i < profiles.length; i++) {
displayProfile(profiles[i]);
}
  }}
