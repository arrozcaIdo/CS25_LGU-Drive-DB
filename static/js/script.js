document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────────────────
     BASE: Sidebar toggle
  ────────────────────────────────────────── */
  const burgerTrigger  = document.getElementById('burgerMenuTrigger');
  const sidebarMenu    = document.getElementById('sidebarMenu');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (burgerTrigger && sidebarMenu && sidebarOverlay) {
    function toggleMenu() {
      sidebarMenu.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    }
    burgerTrigger.addEventListener('click', toggleMenu);
    sidebarOverlay.addEventListener('click', toggleMenu);
  }

  /* ──────────────────────────────────────────
     HISTORY PAGE: Search filter
  ────────────────────────────────────────── */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const tableRows = document.querySelectorAll('#vehicleTable tbody tr');
    searchInput.addEventListener('keyup', () => {
      const value = searchInput.value.toLowerCase();
      tableRows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? '' : 'none';
      });
    });
  }

  /* ──────────────────────────────────────────
     REGISTER PAGE: All form logic
  ────────────────────────────────────────── */
  const donorToggleNew      = document.getElementById('donorToggleNew');
  const donorToggleExisting = document.getElementById('donorToggleExisting');
  if (!donorToggleNew) return; // not on register page, stop here

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

  const assetPanelMaster    = document.getElementById('coreVehicleAssetPanel');

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

  /* -- Helpers -- */
  function toggleInputsReadOnly(container, state) {
    container.querySelectorAll('input').forEach(i => i.readOnly = state);
  }
  function toggleInputsRequired(container, state, bypassList = []) {
    container.querySelectorAll('input').forEach(i => {
      i.required = bypassList.includes(i.id) ? false : state;
    });
  }
  function clearInputs(container) {
    container.querySelectorAll('input').forEach(i => i.value = '');
  }

  /* -- Show asset panel only when both donor+donee are resolved -- */
  function checkWorkflowState() {
    const donorDone = donorToggleNew.checked || (donorToggleExisting.checked && donorSelectEl.value !== '');
    const doneeDone = doneeToggleNew.checked  || (doneeToggleExisting.checked  && doneeSelectEl.value  !== '');
    assetPanelMaster.style.display = (donorDone && doneeDone) ? 'block' : 'none';
  }

  /* -- Donor toggle -- */
  function handleDonorViewChange() {
    donorFieldsGrid.style.display = 'grid';
    if (donorToggleExisting.checked) {
      donorDropContainer.style.display = 'block';
      toggleInputsReadOnly(donorFieldsGrid, true);
      toggleInputsRequired(donorFieldsGrid, false);
    } else {
      donorDropContainer.style.display = 'none';
      donorSelectEl.value = '';
      hiddenDonorInput.value = '';
      toggleInputsReadOnly(donorFieldsGrid, false);
      toggleInputsRequired(donorFieldsGrid, true, ['donor_tel', 'donor_fax', 'donor_email']);
      clearInputs(donorFieldsGrid);
    }
    checkWorkflowState();
  }
  donorToggleNew.addEventListener('change', handleDonorViewChange);
  donorToggleExisting.addEventListener('change', handleDonorViewChange);

  donorSelectEl.addEventListener('change', function () {
    const match = donorsDictionary.find(d => String(d.id) === String(this.value));
    if (match) {
      hiddenDonorInput.value = match.id;
      drName.value  = match.name    || '';
      drAddr.value  = match.address || '';
      drTel.value   = match.tel     || '';
      drFax.value   = match.fax     || '';
      drEmail.value = match.email   || '';
    } else {
      hiddenDonorInput.value = '';
      clearInputs(donorFieldsGrid);
    }
    checkWorkflowState();
  });

  /* -- Donee toggle -- */
  function handleDoneeViewChange() {
    doneeFieldsGrid.style.display = 'grid';
    if (doneeToggleExisting.checked) {
      doneeDropContainer.style.display = 'block';
      toggleInputsReadOnly(doneeFieldsGrid, true);
      toggleInputsRequired(doneeFieldsGrid, false);
    } else {
      doneeDropContainer.style.display = 'none';
      doneeSelectEl.value = '';
      hiddenDoneeInput.value = '';
      toggleInputsReadOnly(doneeFieldsGrid, false);
      toggleInputsRequired(doneeFieldsGrid, true, ['donee_tel', 'donee_fax', 'donee_email']);
      clearInputs(doneeFieldsGrid);
    }
    checkWorkflowState();
  }
  doneeToggleNew.addEventListener('change', handleDoneeViewChange);
  doneeToggleExisting.addEventListener('change', handleDoneeViewChange);

  doneeSelectEl.addEventListener('change', function () {
    const match = doneesDictionary.find(e => String(e.id) === String(this.value));
    if (match) {
      hiddenDoneeInput.value = match.id;
      dName.value   = match.name    || '';
      dAddr.value   = match.address || '';
      dCont.value   = match.contact || '';
      dTel.value    = match.tel     || '';
      dFax.value    = match.fax     || '';
      dEmail.value  = match.email   || '';
    } else {
      hiddenDoneeInput.value = '';
      clearInputs(doneeFieldsGrid);
    }
    checkWorkflowState();
  });

  /* -- Dynamic Motor Vehicle Nodes -- */
  const motorVehicleContainer = document.getElementById('motorVehicleContainer');
  const addVehicleNodeBtn     = document.getElementById('addVehicleNodeBtn');

  if (addVehicleNodeBtn) {
    addVehicleNodeBtn.addEventListener('click', function () {
      const nodeIndex = motorVehicleContainer.children.length + 1;
      const newNode   = document.createElement('div');
      newNode.className = 'vehicle-entry-node';
      newNode.innerHTML = `
        <button type="button" class="remove-node-btn" onclick="this.parentElement.remove()">Remove Item</button>
        <div class="node-index-label">Staged Vehicle Allocation Item #${nodeIndex}</div>
        <div class="form-grid">
          <div class="full-width">
            <label>Vehicle Description Model <span class="required-star">*</span></label>
            <input type="text" name="VehicleDescription[]" class="motor-input" placeholder="Ford F-650 / Kenworth T680" required>
          </div>
          <div>
            <label>Tariff Heading Code <span class="required-star">*</span></label>
            <input type="number" name="VehicleTariff[]" class="motor-input" placeholder="8704" required>
          </div>
          <div>
            <label>Quantity <span class="required-star">*</span></label>
            <input type="number" name="Quantity[]" class="motor-input" min="1" placeholder="1" required>
          </div>
          <div class="full-width">
            <label>Country of Origin <span class="required-star">*</span></label>
            <input type="text" name="Origin[]" class="motor-input" placeholder="USA" required>
          </div>
        </div>
      `;
      motorVehicleContainer.appendChild(newNode);
    });
  }

  /* -- Vehicle type checkboxes -- */
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

  /* -- Form validation -- */
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      if (!checkToggleMotor.checked && !checkTogglePassenger.checked) {
        alert('Validation Error:\nPlease select at least one vehicle type to include (Motor Vehicle or Passenger Car).');
        event.preventDefault();
        return;
      }
      if (donorToggleNew.checked && !drTel.value.trim() && !drFax.value.trim() && !drEmail.value.trim()) {
        alert('Validation Error:\nPlease provide at least one contact method for the New Donor (Telephone, Fax, or Email).');
        drTel.focus();
        event.preventDefault();
        return;
      }
      if (doneeToggleNew.checked && !dTel.value.trim() && !dFax.value.trim() && !dEmail.value.trim()) {
        alert('Validation Error:\nPlease provide at least one contact method for the New Donee (Telephone, Fax, or Email).');
        dTel.focus();
        event.preventDefault();
      }
    });
  }

});