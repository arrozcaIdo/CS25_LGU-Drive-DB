document.addEventListener('DOMContentLoaded', function () {

  /* ══════════════════════════════════════════
     BASE: Sidebar toggle
  ══════════════════════════════════════════ */
  const burgerTrigger  = document.getElementById('burgerMenuTrigger');
  const sidebarMenu    = document.getElementById('sidebarMenu');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (burgerTrigger) {
    function toggleMenu() {
      sidebarMenu.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    }
    burgerTrigger.addEventListener('click', toggleMenu);
    sidebarOverlay.addEventListener('click', toggleMenu);
  }

  /* ══════════════════════════════════════════
     HISTORY: Table sort
  ══════════════════════════════════════════ */
  const sortableHeaders = document.querySelectorAll('th[data-col]');
  if (sortableHeaders.length) {
    let sortCol = null, sortDir = 'asc';
    const tbody = document.querySelector('#vehicleTable tbody');

    sortableHeaders.forEach(th => {
      th.innerHTML += ' <span class="sort-icon"></span>';
      th.addEventListener('click', () => {
        const col = parseInt(th.dataset.col);
        if (sortCol === col) {
          sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          sortCol = col;
          sortDir = 'asc';
        }
        sortableHeaders.forEach(h => h.classList.remove('sort-asc','sort-desc'));
        th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');

        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
          const aText = (a.cells[col] ? a.cells[col].innerText : '').trim().toLowerCase();
          const bText = (b.cells[col] ? b.cells[col].innerText : '').trim().toLowerCase();
          return sortDir === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        rows.forEach(r => tbody.appendChild(r));
      });
    });
  }

  /* ══════════════════════════════════════════
     HISTORY: Details Drawer
  ══════════════════════════════════════════ */
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawer        = document.getElementById('detailsDrawer');
  const drawerClose   = document.getElementById('drawerClose');
  const drawerBody    = document.getElementById('drawerBody');

  function openDrawer(appId) {
    const rec = window.recordsData.find(r => r.app_id === appId);
    if (!rec) return;

    let motorVehicles    = rec.vehicles.filter(v => v.car_type === 'Motor Vehicle');
    let passengerVehicles = rec.vehicles.filter(v => v.car_type === 'Passenger Car');

    let vehicleHTML = '';

    motorVehicles.forEach((v, i) => {
      vehicleHTML += `
        <div class="vehicle-card">
          <div class="vehicle-card-title">Motor Vehicle #${i+1}</div>
          <div class="detail-grid">
            <div class="detail-item full"><div class="detail-label">Description</div><div class="detail-value">${v.description || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Tariff Code</div><div class="detail-value">${v.tariff || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Origin</div><div class="detail-value">${v.origin || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Quantity</div><div class="detail-value">${v.quantity || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Donate ID</div><div class="detail-value"><code>${v.donate_id || '—'}</code></div></div>
          </div>
        </div>`;
    });

    passengerVehicles.forEach((v, i) => {
      vehicleHTML += `
        <div class="vehicle-card passenger">
          <div class="vehicle-card-title">Passenger Car #${i+1}</div>
          <div class="detail-grid">
            <div class="detail-item full"><div class="detail-label">Description</div><div class="detail-value">${v.description || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">VIN</div><div class="detail-value" style="font-family:monospace">${v.vin || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Year Model</div><div class="detail-value">${v.year_model || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Color</div><div class="detail-value">${v.color || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Engine No.</div><div class="detail-value">${v.engine_no || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Displacement</div><div class="detail-value">${v.displacement || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Fuel Type</div><div class="detail-value">${v.fuel_type || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Weight</div><div class="detail-value">${v.weight ? v.weight + ' kg' : '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Reg. Date</div><div class="detail-value">${v.reg_date || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Origin</div><div class="detail-value">${v.origin || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Tariff Code</div><div class="detail-value">${v.tariff || '—'}</div></div>
            <div class="detail-item"><div class="detail-label">Donate ID</div><div class="detail-value"><code>${v.donate_id || '—'}</code></div></div>
          </div>
        </div>`;
    });

    drawerBody.innerHTML = `
      <div class="drawer-section">
        <div class="drawer-section-title">Application Info</div>
        <div class="detail-grid">
          <div class="detail-item"><div class="detail-label">Application ID</div><div class="detail-value">${rec.app_id}</div></div>
          <div class="detail-item"><div class="detail-label">Date</div><div class="detail-value">${rec.app_date}</div></div>
          <div class="detail-item full"><div class="detail-label">Authorized Signature</div><div class="detail-value">${rec.signature || '—'}</div></div>
        </div>
      </div>
      <div class="drawer-section">
        <div class="drawer-section-title">Donee / Consignee</div>
        <div class="detail-grid">
          <div class="detail-item full"><div class="detail-label">Name</div><div class="detail-value">${rec.donee_name}</div></div>
          <div class="detail-item full"><div class="detail-label">Address</div><div class="detail-value">${rec.donee_address || '—'}</div></div>
          <div class="detail-item"><div class="detail-label">Contact Person</div><div class="detail-value">${rec.donee_contact || '—'}</div></div>
          <div class="detail-item"><div class="detail-label">Telephone</div><div class="detail-value">${rec.donee_tel || '—'}</div></div>
          <div class="detail-item"><div class="detail-label">Fax</div><div class="detail-value">${rec.donee_fax || '—'}</div></div>
          <div class="detail-item"><div class="detail-label">Email</div><div class="detail-value">${rec.donee_email || '—'}</div></div>
        </div>
      </div>
      <div class="drawer-section">
        <div class="drawer-section-title">Donor / Supplier</div>
        <div class="detail-grid">
          <div class="detail-item full"><div class="detail-label">Name</div><div class="detail-value">${rec.donor_name}</div></div>
          <div class="detail-item full"><div class="detail-label">Address</div><div class="detail-value">${rec.donor_address || '—'}</div></div>
          <div class="detail-item"><div class="detail-label">Telephone</div><div class="detail-value">${rec.donor_tel || '—'}</div></div>
          <div class="detail-item"><div class="detail-label">Fax</div><div class="detail-value">${rec.donor_fax || '—'}</div></div>
          <div class="detail-item full"><div class="detail-label">Email</div><div class="detail-value">${rec.donor_email || '—'}</div></div>
        </div>
      </div>
      <div class="drawer-section">
        <div class="drawer-section-title">Vehicles (${rec.vehicles.length} total)</div>
        ${vehicleHTML}
      </div>
    `;

    drawerOverlay.classList.add('active');
    drawer.classList.add('active');
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('active');
    drawer.classList.remove('active');
  }

  if (drawerClose)   drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', () => openDrawer(btn.dataset.id));
  });

  /* ══════════════════════════════════════════
     HISTORY: Edit Modal
  ══════════════════════════════════════════ */
  const modalOverlay = document.getElementById('editModalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const editForm     = document.getElementById('editForm');

  function openEditModal(appId) {
    const rec = window.recordsData.find(r => r.app_id === appId);
    if (!rec || !editForm) return;

    editForm.action = `/edit-application/${appId}`;

    // Fill donee
    editForm.querySelector('[name="DoneeID"]').value      = rec.donee_id;
    editForm.querySelector('[name="DoneeName"]').value    = rec.donee_name;
    editForm.querySelector('[name="DoneeAddress"]').value = rec.donee_address || '';
    editForm.querySelector('[name="ContactPerson"]').value= rec.donee_contact || '';
    editForm.querySelector('[name="DoneeTelNo"]').value   = rec.donee_tel || '';
    editForm.querySelector('[name="DoneeFaxNo"]').value   = rec.donee_fax || '';
    editForm.querySelector('[name="DoneeEmail"]').value   = rec.donee_email || '';

    // Fill donor
    editForm.querySelector('[name="DonorID"]').value      = rec.donor_id;
    editForm.querySelector('[name="DonorName"]').value    = rec.donor_name;
    editForm.querySelector('[name="DonorAddress"]').value = rec.donor_address || '';
    editForm.querySelector('[name="DonorTelNo"]').value   = rec.donor_tel || '';
    editForm.querySelector('[name="DonorFaxNo"]').value   = rec.donor_fax || '';
    editForm.querySelector('[name="DonorEmail"]').value   = rec.donor_email || '';

    // Build motor vehicle rows
    const motorContainer = document.getElementById('editMotorContainer');
    motorContainer.innerHTML = '';
    const motorVehicles = rec.vehicles.filter(v => v.car_type === 'Motor Vehicle');
    if (motorVehicles.length === 0) {
      motorContainer.innerHTML = buildMotorNode(1, {});
    } else {
      motorVehicles.forEach((v, i) => motorContainer.innerHTML += buildMotorNode(i+1, v));
    }

    // Fill passenger car
    const passenger = rec.vehicles.find(v => v.car_type === 'Passenger Car');
    editForm.querySelector('[name="VehicleDescriptionSingle"]').value = passenger ? passenger.description || '' : '';
    editForm.querySelector('[name="YearModel"]').value        = passenger ? passenger.year_model || '' : '';
    editForm.querySelector('[name="EngineDisplacement"]').value = passenger ? passenger.displacement || '' : '';
    editForm.querySelector('[name="Color"]').value            = passenger ? passenger.color || '' : '';
    editForm.querySelector('[name="VIN"]').value              = passenger ? passenger.vin || '' : '';
    editForm.querySelector('[name="RegistrationDate"]').value = passenger ? passenger.reg_date || '' : '';
    editForm.querySelector('[name="EngineNumber"]').value     = passenger ? passenger.engine_no || '' : '';
    editForm.querySelector('[name="FuelType"]').value         = passenger ? passenger.fuel_type || 'G' : 'G';
    editForm.querySelector('[name="VehicleWeight"]').value    = passenger ? passenger.weight || '' : '';
    editForm.querySelector('[name="OriginSingle"]').value     = passenger ? passenger.origin || '' : '';

    modalOverlay.classList.add('active');
  }

  function buildMotorNode(index, v) {
    return `
      <div class="vehicle-entry-node">
        ${index > 1 ? '<button type="button" class="remove-node-btn" onclick="this.parentElement.remove()">Remove</button>' : ''}
        ${index > 1 ? `<div class="node-index-label">Vehicle #${index}</div>` : ''}
        <div class="form-grid">
          <div class="full-width">
            <label>Vehicle Description <span class="required-star">*</span></label>
            <input type="text" name="VehicleDescription[]" value="${v.description || ''}" placeholder="Ford F-650" required>
          </div>
          <div>
            <label>Tariff Code</label>
            <input type="number" name="VehicleTariff[]" value="${v.tariff || ''}" placeholder="8704">
          </div>
          <div>
            <label>Quantity</label>
            <input type="number" name="Quantity[]" value="${v.quantity || 1}" min="1">
          </div>
          <div class="full-width">
            <label>Country of Origin</label>
            <input type="text" name="Origin[]" value="${v.origin || ''}" placeholder="USA">
          </div>
        </div>
      </div>`;
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  if (modalClose)   modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id));
  });

  const addEditMotorBtn = document.getElementById('addEditMotorBtn');
  if (addEditMotorBtn) {
    addEditMotorBtn.addEventListener('click', () => {
      const container = document.getElementById('editMotorContainer');
      const index = container.children.length + 1;
      const div = document.createElement('div');
      div.innerHTML = buildMotorNode(index, {});
      container.appendChild(div.firstElementChild);
    });
  }

  /* ══════════════════════════════════════════
     HISTORY: Delete confirmation
  ══════════════════════════════════════════ */
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const appId = btn.dataset.id;
      if (confirm(`Delete application ${appId}?\n\nThis will permanently remove all associated vehicles and records. This cannot be undone.`)) {
        document.getElementById(`deleteForm-${appId}`).submit();
      }
    });
  });

  /* ══════════════════════════════════════════
     REGISTER PAGE: All form logic
  ══════════════════════════════════════════ */
  const donorToggleNew = document.getElementById('donorToggleNew');
  if (!donorToggleNew) return;

  const donorToggleExisting = document.getElementById('donorToggleExisting');
  const donorDropContainer  = document.getElementById('donorDropdownContainer');
  const donorSelectEl       = document.getElementById('donorSelect');
  const donorFieldsGrid     = document.getElementById('donorFieldsGrid');
  const hiddenDonorInput    = document.getElementById('hiddenDonorID');

  const doneeToggleNew      = document.getElementById('doneeToggleNew');
  const doneeToggleExisting = document.getElementById('doneeToggleExisting');
  const doneeDropContainer  = document.getElementById('doneeDropdownContainer');
  const doneeSelectEl       = document.getElementById('doneeSelect');
  const doneeFieldsGrid     = document.getElementById('doneeFieldsGrid');
  const hiddenDoneeInput    = document.getElementById('hiddenDoneeID');

  const assetPanelMaster = document.getElementById('coreVehicleAssetPanel');

  const drName  = document.getElementById('donor_name');
  const drAddr  = document.getElementById('donor_addr');
  const drTel   = document.getElementById('donor_tel');
  const drFax   = document.getElementById('donor_fax');
  const drEmail = document.getElementById('donor_email');

  const dName   = document.getElementById('donee_name');
  const dAddr   = document.getElementById('donee_addr');
  const dCont   = document.getElementById('donee_cont');
  const dTel    = document.getElementById('donee_tel');
  const dFax    = document.getElementById('donee_fax');
  const dEmail  = document.getElementById('donee_email');

  function toggleReadOnly(container, state) { container.querySelectorAll('input').forEach(i => i.readOnly = state); }
  function toggleRequired(container, state, bypass = []) {
    container.querySelectorAll('input').forEach(i => { i.required = bypass.includes(i.id) ? false : state; });
  }
  function clearInputs(container) { container.querySelectorAll('input').forEach(i => i.value = ''); }

  function checkWorkflowState() {
    const donorOk = donorToggleNew.checked || (donorToggleExisting.checked && donorSelectEl.value !== '');
    const doneeOk = doneeToggleNew.checked  || (doneeToggleExisting.checked  && doneeSelectEl.value  !== '');
    assetPanelMaster.style.display = (donorOk && doneeOk) ? 'block' : 'none';
  }

  function handleDonorChange() {
    donorFieldsGrid.style.display = 'grid';
    if (donorToggleExisting.checked) {
      donorDropContainer.style.display = 'block';
      toggleReadOnly(donorFieldsGrid, true);
      toggleRequired(donorFieldsGrid, false);
    } else {
      donorDropContainer.style.display = 'none';
      donorSelectEl.value = ''; hiddenDonorInput.value = '';
      toggleReadOnly(donorFieldsGrid, false);
      toggleRequired(donorFieldsGrid, true, ['donor_tel','donor_fax','donor_email']);
      clearInputs(donorFieldsGrid);
    }
    checkWorkflowState();
  }
  donorToggleNew.addEventListener('change', handleDonorChange);
  donorToggleExisting.addEventListener('change', handleDonorChange);

  donorSelectEl.addEventListener('change', function () {
    const m = donorsDictionary.find(d => String(d.id) === String(this.value));
    if (m) {
      hiddenDonorInput.value = m.id;
      drName.value = m.name||''; drAddr.value = m.address||'';
      drTel.value = m.tel||''; drFax.value = m.fax||''; drEmail.value = m.email||'';
    } else { hiddenDonorInput.value = ''; clearInputs(donorFieldsGrid); }
    checkWorkflowState();
  });

  function handleDoneeChange() {
    doneeFieldsGrid.style.display = 'grid';
    if (doneeToggleExisting.checked) {
      doneeDropContainer.style.display = 'block';
      toggleReadOnly(doneeFieldsGrid, true);
      toggleRequired(doneeFieldsGrid, false);
    } else {
      doneeDropContainer.style.display = 'none';
      doneeSelectEl.value = ''; hiddenDoneeInput.value = '';
      toggleReadOnly(doneeFieldsGrid, false);
      toggleRequired(doneeFieldsGrid, true, ['donee_tel','donee_fax','donee_email']);
      clearInputs(doneeFieldsGrid);
    }
    checkWorkflowState();
  }
  doneeToggleNew.addEventListener('change', handleDoneeChange);
  doneeToggleExisting.addEventListener('change', handleDoneeChange);

  doneeSelectEl.addEventListener('change', function () {
    const m = doneesDictionary.find(e => String(e.id) === String(this.value));
    if (m) {
      hiddenDoneeInput.value = m.id;
      dName.value = m.name||''; dAddr.value = m.address||''; dCont.value = m.contact||'';
      dTel.value = m.tel||''; dFax.value = m.fax||''; dEmail.value = m.email||'';
    } else { hiddenDoneeInput.value = ''; clearInputs(doneeFieldsGrid); }
    checkWorkflowState();
  });

  // Dynamic motor vehicle nodes
  const motorVehicleContainer = document.getElementById('motorVehicleContainer');
  const addVehicleNodeBtn     = document.getElementById('addVehicleNodeBtn');
  if (addVehicleNodeBtn) {
    addVehicleNodeBtn.addEventListener('click', () => {
      const idx = motorVehicleContainer.children.length + 1;
      const node = document.createElement('div');
      node.className = 'vehicle-entry-node';
      node.innerHTML = `
        <button type="button" class="remove-node-btn" onclick="this.parentElement.remove()">Remove</button>
        <div class="node-index-label">Vehicle #${idx}</div>
        <div class="form-grid">
          <div class="full-width"><label>Vehicle Description <span class="required-star">*</span></label>
            <input type="text" name="VehicleDescription[]" class="motor-input" placeholder="Ford F-650" required></div>
          <div><label>Tariff Code</label><input type="number" name="VehicleTariff[]" class="motor-input" placeholder="8704"></div>
          <div><label>Quantity</label><input type="number" name="Quantity[]" class="motor-input" min="1" placeholder="1"></div>
          <div class="full-width"><label>Country of Origin</label><input type="text" name="Origin[]" class="motor-input" placeholder="USA"></div>
        </div>`;
      motorVehicleContainer.appendChild(node);
    });
  }

  // Vehicle type checkboxes
  const checkToggleMotor     = document.getElementById('checkToggleMotor');
  const checkTogglePassenger = document.getElementById('checkTogglePassenger');
  const stdPanel             = document.getElementById('standardVehiclePanel');
  const passPanel            = document.getElementById('passengerVehiclePanel');

  function syncVehiclePanels() {
    stdPanel.style.display  = checkToggleMotor.checked     ? 'block' : 'none';
    passPanel.style.display = checkTogglePassenger.checked ? 'block' : 'none';
    document.querySelectorAll('.motor-input').forEach(i     => i.required = checkToggleMotor.checked);
    document.querySelectorAll('.passenger-input').forEach(i => i.required = checkTogglePassenger.checked);
  }
  checkToggleMotor.addEventListener('change', syncVehiclePanels);
  checkTogglePassenger.addEventListener('change', syncVehiclePanels);

  // Form validation
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      if (!checkToggleMotor.checked && !checkTogglePassenger.checked) {
        alert('Please select at least one vehicle type.');
        e.preventDefault(); return;
      }
      if (donorToggleNew.checked && !drTel.value.trim() && !drFax.value.trim() && !drEmail.value.trim()) {
        alert('New Donor requires at least one contact method.'); drTel.focus(); e.preventDefault(); return;
      }
      if (doneeToggleNew.checked && !dTel.value.trim() && !dFax.value.trim() && !dEmail.value.trim()) {
        alert('New Donee requires at least one contact method.'); dTel.focus(); e.preventDefault();
      }
    });
  }

});