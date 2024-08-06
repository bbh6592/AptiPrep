document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
    // Check if there's a stored state and restore it
    chrome.storage.local.get('completedTopics', (result) => {
      const completedTopics = result.completedTopics || [];
      checkboxes.forEach(checkbox => {
        if (completedTopics.includes(checkbox.dataset.topic)) {
          checkbox.checked = true;
        }
      });
    });
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const completedTopics = Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.dataset.topic);
        chrome.storage.local.set({ completedTopics });
      });
    });
  });
  