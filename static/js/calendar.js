let modal;
let selectedDate = null;

function loadSelect(url, elementId, selectedId = null) {
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(elementId);
            select.innerHTML = '';
            data.forEach(item => {
                const selected = item.id === selectedId ? 'selected' : '';
                select.innerHTML += `<option value="${item.id}" ${selected}>${item.name}</option>`;
            });
        });
}

function loadFilterSelect(url, selectId) {
     const select = document.getElementById(selectId);
    if (!select) return; 
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            data.forEach(item => {
                select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
            });
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    let modal = null; 
        const modalElement = document.getElementById('visitModal');
    if (modalElement) {
        modal = new bootstrap.Modal(modalElement);
    } 
    loadFilterSelect('/api/gestores/', 'filterGestor');
loadFilterSelect('/api/status/', 'filterStatus');

    

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
         timeZone: 'local',  
        selectable: true,
         expandRows: true,
    contentHeight: 'auto',

        events: '/api/work-plan/events/',

       dateClick: function (info) {
    selectedDate = info.dateStr;
    document.getElementById('deleteVisit').style.display = 'none';

    document.getElementById('visitForm').reset();
    document.getElementById('visitId').value = '';

    loadSelect('/api/gestores/', 'gestor');
    loadSelect('/api/status/', 'status');

    modal.show();
},


      eventClick: function (info) {
    info.jsEvent.preventDefault();
    info.jsEvent.stopPropagation();
    window.location.href = `/work-plan/visits/${info.event.id}/`;;
},


eventDidMount: function(info) {

    const type = info.event.extendedProps.type;

    let icon = '';
    if (type === 'medico') {
        icon = '<i class="bi bi-heart-pulse-fill me-1"></i>';
    }

    if (type === 'institucion') {
        icon = '<i class="bi bi-building me-1"></i>';
    }

    
    const dot = info.el.querySelector('.fc-daygrid-event-dot');
    if (dot) {
        dot.insertAdjacentHTML('afterend', icon);
    }

    
    if (info.event.extendedProps.status_color) {
        dot.style.borderColor = info.event.extendedProps.status_color;
    }
},

events: function(fetchInfo, successCallback) {

    const gestorEl = document.getElementById('filterGestor');
    const statusEl = document.getElementById('filterStatus');
    const typeEl = document.getElementById('filterType');

    const params = new URLSearchParams();

  
    if (gestorEl && gestorEl.value) params.append('gestor', gestorEl.value);
    if (statusEl && statusEl.value) params.append('status', statusEl.value);
    if (typeEl && typeEl.value) params.append('type', typeEl.value);

    fetch('/api/work-plan/events/?' + params.toString())
        .then(res => res.json())
        .then(data => successCallback(data));
},


    });

    calendar.render();
['filterGestor', 'filterStatus', 'filterType'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('change', () => {
            calendar.refetchEvents();
        });
    }
});


const saveVisitBtn = document.getElementById('saveVisit');

if (saveVisitBtn) {
    saveVisitBtn.addEventListener('click', function () {

        const visitId = document.getElementById('visitId').value;

        const payload = {
            title: document.getElementById('title').value,
            gestor: document.getElementById('gestor').value,
            status: document.getElementById('status').value,
            start: selectedDate + 'T' + document.getElementById('start').value,
            end: selectedDate + 'T' + document.getElementById('end').value,
            type: document.getElementById('type').value,
        };

        const url = visitId
            ? `/api/work-plan/update/${visitId}/`
            : '/api/work-plan/create/';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(() => {
            modal.hide();
            calendar.refetchEvents();
        });
    });
}

const delVisitButton= document.getElementById('deleteVisit')
if(delVisitButton){
delVisitButton.addEventListener('click', function () {
    const visitId = document.getElementById('visitId').value;

    if (!visitId) return;

    if (!confirm('¿Seguro que deseas eliminar esta visita?')) return;

    fetch(`/api/work-plan/delete/${visitId}/`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        modal.hide();
        calendar.refetchEvents();
    });
});
}

const userModal = new bootstrap.Modal(
    document.getElementById('userModal')
);

document.getElementById('openUserModal')
?.addEventListener('click', () => userModal.show());

document.getElementById('saveUser')
?.addEventListener('click', () => {

    const payload = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    };

    fetch('/api/users/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(() => {
        userModal.hide();
        alert('Usuario creado');
    });
});

let gestores = [];

fetch('/api/gestores/')
  .then(res => res.json())
  .then(data => {
    gestores = data;
  });

const searchInput = document.getElementById('gestorSearch');
const resultsBox = document.getElementById('gestorResults');
const hiddenInput = document.getElementById('filterGestor');

searchInput.addEventListener('input', function () {
  const value = this.value.toLowerCase();
  resultsBox.innerHTML = '';

  if (!value) {
    resultsBox.classList.add('d-none');
    hiddenInput.value = '';
    calendar.refetchEvents();
    return;
  }

  const filtered = gestores.filter(g =>
    g.name.toLowerCase().includes(value)
  );

  filtered.forEach(g => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'list-group-item list-group-item-action';
    item.textContent = g.name;

    item.addEventListener('click', () => {
      searchInput.value = g.name;
      hiddenInput.value = g.id;
      resultsBox.classList.add('d-none');
      calendar.refetchEvents();
    });

    resultsBox.appendChild(item);
  });

  resultsBox.classList.remove('d-none');
});


});
