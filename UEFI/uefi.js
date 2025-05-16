const datetimeDiv = document.getElementById('datetime');
const options = document.querySelectorAll('#boot-options li');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const startMemTestBtn = document.getElementById('start-mem-test');
const memProgress = document.getElementById('mem-progress');
const memTestResult = document.getElementById('mem-test-result');

let selectedIndex = 0;
let memTestRunning = false;

function updateDateTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  datetimeDiv.innerHTML = `Date: <strong>${yyyy}-${MM}-${dd}</strong> &nbsp; Time: <strong>${hh}:${mm}:${ss}</strong>`;
}

function highlightSelected() {
  options.forEach((opt, i) => {
    opt.classList.toggle('selected', i === selectedIndex);
  });
}

function switchTab(tabName) {
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
  });
  
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-tab`);
  });
}

function runMemoryTest() {
  if (memTestRunning) return;
  
  memTestRunning = true;
  startMemTestBtn.disabled = true;
  memTestBtn.textContent = "Testing...";
  memTestResult.innerHTML = "<span class='blink'>Testing memory...</span>";
  
  let progress = 0;
  memProgress.style.width = "0%";
  
  const memTestInterval = setInterval(() => {
    progress += 1;
    memProgress.style.width = `${progress}%`;
    memProgress.querySelector('.progress-text').textContent = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(memTestInterval);
      memTestRunning = false;
      startMemTestBtn.disabled = false;
      startMemTestBtn.textContent = "Start Memory Test";
      memTestResult.innerHTML = "<span style='color:#00FF00;'>✓ Memory test completed successfully. No errors found.</span>";
    }
  }, 50);
}

window.addEventListener('keydown', (e) => {
  // Boot option navigation
  if (document.getElementById('boot-tab').classList.contains('active')) {
    if (e.key === 'ArrowDown') {
      selectedIndex = (selectedIndex + 1) % options.length;
      highlightSelected();
    }
    if (e.key === 'ArrowUp') {
      selectedIndex = (selectedIndex - 1 + options.length) % options.length;
      highlightSelected();
    }
    if (e.key === 'Enter') {
      const selectedOption = options[selectedIndex].textContent.trim();
      alert(`Booting: ${selectedOption}`);
    }
  }
  
  // Tab switching
  if (e.key === 'Tab') {
    e.preventDefault();
    let activeTabIndex = 0;
    tabs.forEach((tab, index) => {
      if (tab.classList.contains('active')) {
        activeTabIndex = index;
      }
    });
    
    const nextTabIndex = (activeTabIndex + 1) % tabs.length;
    switchTab(tabs[nextTabIndex].getAttribute('data-tab'));
  }
  
  // Function keys
  if (e.key === 'F1' && document.getElementById('boot-tab').classList.contains('active')) {
    selectedIndex = 0;
    highlightSelected();
    setTimeout(() => {
      alert('Booting: WebNux Linux');
    }, 100);
  }
  
  if (e.key === 'F10') {
    alert('Saving configuration and exiting...');
  }
  
  if (e.key === 'Escape') {
    alert('Exiting UEFI Boot Manager');
  }
});

// Tab click events
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab.getAttribute('data-tab'));
  });
});

// Memory test button
startMemTestBtn.addEventListener('click', runMemoryTest);

updateDateTime();
setInterval(updateDateTime, 1000);
highlightSelected();