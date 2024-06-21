class InfoTable {
    constructor(element) {
      this.element = element;
      this.attributes = Array.from(element.attributes);
    }
  
    createTable() {
      const table = document.createElement('table');
  
      const rows = this.processAttributes();
  
      rows.forEach(row => table.appendChild(row));
  
      return table;
    }
  
    processAttributes() {
      const rows = [];
      let headerRow = null;
  
      const isFirstAttributeNull = this.attributes.length > 0 && this.attributes[0].name === 'null';
        
      let startIndex = 0;
      if (!isFirstAttributeNull) {
        startIndex = 1;
        const firstAttr = this.attributes[0];
        const header = this.formatHeader(firstAttr.name);
        const values = firstAttr.value.split(' | ');
  
        headerRow = document.createElement('tr');
        const firstHeaderCell = document.createElement('th');
        firstHeaderCell.textContent = header;
        headerRow.appendChild(firstHeaderCell);
  
        values.forEach(value => {
          const headerCell = document.createElement('th');
          headerCell.textContent = value;
          headerRow.appendChild(headerCell);
        });
        rows.push(headerRow);
      }
  
      this.attributes.slice(startIndex).forEach(attr => {
        if (attr.name === 'null') return;
  
        const row = document.createElement('tr');
        const header = this.formatHeader(attr.name);
  
        const values = attr.value.split(' | ');
        const cells = [header, ...values].map((value, idx) => {
          const cell = document.createElement(idx === 0 ? 'th' : 'td');
          cell.textContent = value;
          return cell;
        });
  
        cells.forEach(cell => row.appendChild(cell));
        rows.push(row);
      });
  
      return rows;
    }
  
    formatHeader(header) {
      return header
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }
  
  function convertInfoTables() {
    const infoTables = document.querySelectorAll('Info-Table');
    infoTables.forEach(infoTable => {
      const table = new InfoTable(infoTable).createTable();
      infoTable.replaceWith(table);
    });
  }

  confirmEmailInput = document.querySelector('#cemail');

  function verifyEmailMatch() {
    emailInput = document.querySelector('#email');
    errorElement = document.querySelector('.error');
    
    if (emailInput.value !== confirmEmailInput.value) {
        errorElement.classList.remove('hidden');
    } else {
        errorElement.classList.add('hidden');
    }
  }
  
  document.addEventListener('DOMContentLoaded', convertInfoTables);
  confirmEmailInput.addEventListener('input', verifyEmailMatch);