async function fetchUsers() {
  try {
    const response = await axios.get('/api/users');
    const users = response.data;
    
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = ''; // Clear existing content
    
    users.forEach(user => {
      const row = document.createElement('tr');
      
      // Log the user object to debug
      console.log('User data:', user);
      
      // Fix image path by prepending server URL if needed
      const imagePath = user.image.startsWith('/') ? user.image : '/' + user.image;
      
      row.innerHTML = `
        <td class="py-2 px-4 border-b">
          <img src="${imagePath}" alt="User Image" class="w-16 h-16 object-cover rounded-md">
        </td>
        <td class="py-2 px-4 border-b">${user.room || ''}</td>
        <td class="py-2 px-4 border-b">${user.name || ''}</td>
        <td class="py-2 px-4 border-b">${user.citizenid || ''}</td>
        <td class="py-2 px-4 border-b">${user.tel || ''}</td>
        <td class="py-2 px-4 border-b">${user.carinfo || ''}</td>
        <td class="py-2 px-4 border-b">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onclick="editUser('${user._id}')">Edit</button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error:', error);
    alert('Error fetching user data. Please try again.');
  }
}

// Load data when page initializes
window.addEventListener('load', fetchUsers);

// Refresh data every 30 seconds
setInterval(fetchUsers, 30000);
