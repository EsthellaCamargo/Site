const botaoAprovado = document.querySelector('.aprovado');
const botaoRejeitado = document.querySelector('.rejeitado');

// --- SIMULAÇÃO: No mundo real, este ID viria do banco de dados
//     quando você carregasse a propaganda para aprovação.
//     Por exemplo, você pode ter uma URL como 'aprovar.html?id=123'
//     e extrair o ID da URL.
const currentPropagandaId = 1; // Substitua por um ID dinâmico ou carregado do BD

botaoAprovado.addEventListener('click', () => {
   
    fetch('http://localhost/meu_projeto_aprovacao/api/aprovar_propaganda.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: currentPropagandaId }) 
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
    })
    .catch(error => {
        console.error('Erro ao aprovar:', error);
        alert('Ocorreu um erro ao tentar aprovar a propaganda.');
    });
});

botaoRejeitado.addEventListener('click', () => {
    const motivo = prompt('Por que você está rejeitando esta propaganda?');
    if (motivo) {
        
        fetch('http://localhost/meu_projeto_aprovacao/api/rejeitar_propaganda.php', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: currentPropagandaId, motivo: motivo }) 
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); 
        })
        .catch(error => {
            console.error('Erro ao rejeitar:', error);
            alert('Ocorreu um erro ao tentar rejeitar a propaganda.');
        });
    }
});
