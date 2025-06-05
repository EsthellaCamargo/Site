document.addEventListener('DOMContentLoaded', function() {
    const approveBtn = document.getElementById('approveBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const messageDiv = document.getElementById('message');
    const advertisementPreview = document.querySelector('.advertisement-preview');
    const approvalContainer = document.querySelector('.approval-container');
    const nomePropagandaInput = document.getElementById('nomePropaganda');
    const descricaoPropagandaInput = document.getElementById('descricaoPropaganda');
    const fornecedorPropagandaInput = document.getElementById('fornecedorPropaganda');
    const valorTotalPropagandaInput = document.getElementById('valorTotalPropaganda');

    function verificarCamposPreenchidos() {
        return (
            nomePropagandaInput.value.trim() !== "" &&
            descricaoPropagandaInput.value.trim() !== "" &&
            fornecedorPropagandaInput.value.trim() !== "" &&
            valorTotalPropagandaInput.value.trim() !== ""
        );
    }

    function formatarParaReal(valor) {
        const valorNumerico = parseFloat(valor);
        if (!isNaN(valorNumerico)) {
            return valorNumerico.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }
        return '';
    }

    // Formatar o valor ao perder o foco
    valorTotalPropagandaInput.addEventListener('blur', function() {
        this.value = formatarParaReal(this.value);
    });

    rejectBtn.addEventListener('click', function() {
        if (verificarCamposPreenchidos()) {
            approveBtn.disabled = true;
            rejectBtn.disabled = true;
            messageDiv.textContent = ""; // Limpa qualquer mensagem anterior

            const reasonContainer = document.createElement('div');
            reasonContainer.classList.add('rejection-reason');
            reasonContainer.style.marginTop = '20px';
            reasonContainer.style.textAlign = 'center';

            const reasonLabel = document.createElement('label');
            reasonLabel.textContent = 'Motivo da Rejeição:';
            reasonLabel.style.display = 'block';
            reasonLabel.style.marginBottom = '5px';
            reasonLabel.style.fontWeight = 'bold';

            const reasonInput = document.createElement('textarea');
            reasonInput.id = 'rejectionReason';
            reasonInput.rows = '3';
            reasonInput.style.width = 'calc(100% - 12px)';
            reasonInput.style.padding = '8px';
            reasonInput.style.border = '1px solid #ddd';
            reasonInput.style.borderRadius = '4px';
            reasonInput.style.boxSizing = 'border-box';
            reasonInput.style.fontSize = '16px';
            reasonInput.style.marginBottom = '10px';

            const confirmRejectBtn = document.createElement('button');
            confirmRejectBtn.textContent = 'Confirmar Rejeição';
            confirmRejectBtn.classList.add('reject-button');
            confirmRejectBtn.style.padding = '10px 20px';
            confirmRejectBtn.style.border = 'none';
            confirmRejectBtn.style.borderRadius = '5px';
            confirmRejectBtn.style.cursor = 'pointer';
            confirmRejectBtn.style.fontSize = '16px';
            confirmRejectBtn.style.backgroundColor = '#f44336';
            confirmRejectBtn.style.color = 'white';

            reasonContainer.appendChild(reasonLabel);
            reasonContainer.appendChild(reasonInput);
            reasonContainer.appendChild(confirmRejectBtn);

            approvalContainer.appendChild(reasonContainer);

            confirmRejectBtn.addEventListener('click', function() {
                const reasonText = document.getElementById('rejectionReason').value;
                advertisementPreview.style.backgroundColor = '#ffe6e6';
                messageDiv.textContent = `Propaganda Rejeitada. Motivo: ${reasonText}`;
                messageDiv.style.color = '#f44336';
                reasonContainer.remove();
            });
        } else {
            messageDiv.textContent = "Por favor, preencha todos os campos antes de rejeitar.";
            messageDiv.style.color = "#f44336";
            advertisementPreview.style.backgroundColor = '#fff'; // Resetar cor de fundo da prévia
        }
    });

    approveBtn.addEventListener('click', function() {
        if (verificarCamposPreenchidos()) {
            advertisementPreview.style.backgroundColor = '#e6ffe7';
            messageDiv.textContent = 'Propaganda Aprovada!';
            messageDiv.style.color = '#4CAF50';
            approveBtn.disabled = true;
            rejectBtn.disabled = true;
        } else {
            messageDiv.textContent = "Por favor, preencha todos os campos antes de aprovar.";
            messageDiv.style.color = "#f44336";
            advertisementPreview.style.backgroundColor = '#fff'; // Resetar cor de fundo da prévia
        }
    });

    // Inicialmente desabilita os botões
    approveBtn.disabled = true;
    rejectBtn.disabled = true;
});