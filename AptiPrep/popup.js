document.addEventListener('DOMContentLoaded', () => {
  const showResourcesButton = document.getElementById('show-resources');
  const resourceLinks = document.getElementById('resource-links');
  const tipElement = document.getElementById('tip');
  const dateElement = document.getElementById('date');
  const progressIcon = document.getElementById('progress-icon');
  const progressContainer = document.getElementById('progress-container');
  const checkboxes = document.querySelectorAll('.checkbox-container input');
  const tips = [
    "Practice makes perfect!",
    "Review your mistakes to learn from them.",
    "Break your study sessions into manageable chunks.",
    "Use mnemonic devices to remember information.",
    "Teach what you've learned to someone else.",
    "Stay positive and confident in your abilities.",
    "Practice mental math to improve speed.",
    "Focus on understanding concepts, not just memorizing.",
    "Take regular breaks to stay fresh.",
    "Use diagrams and charts to visualize information."
  ];

  // Function to get today's tip
  function getDailyTip() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return tips[dayOfYear % tips.length];
  }

  // Function to format the date
  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  // Set today's tip
  tipElement.textContent = getDailyTip();

  // Set today's date
  dateElement.textContent = formatDate(new Date());

  // Check if there's a stored state and restore it
  chrome.storage.local.get(['linksVisible', 'completedTopics'], (result) => {
    if (result.linksVisible) {
      resourceLinks.style.display = 'block';
    }
    const completedTopics = result.completedTopics || [];
    checkboxes.forEach(checkbox => {
      if (completedTopics.includes(checkbox.dataset.topic)) {
        checkbox.checked = true;
      }
    });
  });

  showResourcesButton.addEventListener('click', () => {
    const isVisible = resourceLinks.style.display === 'block';
    resourceLinks.style.display = isVisible ? 'none' : 'block';
    chrome.storage.local.set({ linksVisible: !isVisible });
  });

  progressIcon.addEventListener('click', () => {
    const isVisible = progressContainer.style.display === 'block';
    progressContainer.style.display = isVisible ? 'none' : 'block';
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
