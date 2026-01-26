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
    modal = new bootstrap.Modal(document.getElementById('visitModal'));
    loadFilterSelect('/api/gestores/', 'filterGestor');
loadFilterSelect('/api/status/', 'filterStatus');

    const calendarEl = document.getElementById('calendar');

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
    fetch(`/api/work-plan/visit/${info.event.id}/`)
        .then(res => res.json())
        .then(data => {
            selectedDate = data.start.split('T')[0];
            document.getElementById('visitId').value = data.id;
            document.getElementById('title').value = data.title;
            document.getElementById('type').value = data.type;

            const start = data.start.split('T')[1].substring(0,5);
            const end = data.end.split('T')[1].substring(0,5);

            document.getElementById('start').value = start;
            document.getElementById('end').value = end;

            loadSelect('/api/gestores/', 'gestor', data.gestor);
            loadSelect('/api/status/', 'status', data.status);
            document.getElementById('deleteVisit').style.display = 'inline-block';

            modal.show();
        });
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

    const gestor = document.getElementById('filterGestor').value;
    const status = document.getElementById('filterStatus').value;
    const type = document.getElementById('filterType').value;

    const params = new URLSearchParams();

    if (gestor) params.append('gestor', gestor);
    if (status) params.append('status', status);
    if (type) params.append('type', type);

    fetch('/api/work-plan/events/?' + params.toString())
        .then(res => res.json())
        .then(data => successCallback(data));
},


    });

    calendar.render();
    ['filterGestor', 'filterStatus', 'filterType'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        calendar.refetchEvents();
    });
});


document.getElementById('saveVisit').addEventListener('click', function () {
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

document.getElementById('deleteVisit').addEventListener('click', function () {
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


});
