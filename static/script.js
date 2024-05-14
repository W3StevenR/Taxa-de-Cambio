function fetchData() {
    // Faz uma requisição AJAX para a rota '/get_data' do Flask
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            // Atualiza os dados na página
            document.getElementById('data').innerHTML = `
                <p>Alta: ${data.high}</p>
                <p>Baixa: ${data.low}</p>
                <p>Variação: ${data.varBid}</p>
                <p>Porcentagem de Mudança: ${data.pctChange}</p>
                <p>Oferta: ${data.bid}</p>
                <p>Pergunte: ${data.ask}</p>
                <p>Data e Hora: ${data.create_date}</p>
            `;
        }).catch(error => {
            console.error('Erro ao enviar dados:', error);
          });
    }

fetch('https://economia.awesomeapi.com.br/json/available/uniq')
    //Requisita as informações no XML contendo todas as moedas com Tag-Nome
    .then(response => response.json())
    .then(data => {
        //console.log(data);

    //Acesso aos Select da pag HTML
    const selectMoeda1 = document.getElementById('moeda1');
    const selectMoeda2 = document.getElementById('moeda2');

    
    for (const sigla in data) {
        //Veirifica se a propriedade da sigla
        //Criação das opções de Moeda o Loop gera options dentro de um select
        if (Object.hasOwnProperty.call(data, sigla)) {
        const nome = data[sigla];

        // Opção para o primeiro botão de seleção
        const optionMoeda1 = document.createElement('option');
        optionMoeda1.value = sigla;
        optionMoeda1.textContent = `${sigla} - ${nome}`;
        selectMoeda1.appendChild(optionMoeda1);

        // Opção para o segundo botão de seleção
        const optionMoeda2 = document.createElement('option');
        optionMoeda2.value = sigla;
        optionMoeda2.textContent = `${sigla} - ${nome}`;
        selectMoeda2.appendChild(optionMoeda2);

        }
    }
    })
    .catch(error => console.error('Erro ao carregar dados:', error));

    // Ao clicar no botão 'Enviar'
    document.getElementById('enviar').addEventListener('click', function() {

      const tag_moeda1 = document.getElementById('moeda1').value;//Recebe o valor dos select apos a escolha
      const tag_moeda2 = document.getElementById('moeda2').value;//'' '' ''
          // Verifica se ambas as moedas foram selecionadas
      if (moeda1 && moeda2) {
        // Cria um objeto FormData para enviar os dados
        const formData = new FormData();// Cria objetos que representam pares chave/valor 
        //Será usado para recupar as informações de cambio com suas siglas concatenadas no backend
        formData.append('moeda1', tag_moeda1);
        formData.append('moeda2', tag_moeda2);

        // Envia os dados para o servidor usando AJAX
        fetch('/post_data', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            console.log('Dados enviados com sucesso!');

           // Chama a função fetchData a cada 60 segundos
           setInterval(fetchData, 10000);

            // Chama a função fetchData quando a página é carregada
           fetchData();
                    
            }
            
           else {
            console.error('Falha ao enviar dados.');
          }
        })
        .catch(error => {
          console.error('Erro ao enviar dados:', error);
        });
      } else {
        console.error('Por favor, selecione duas moedas.');
      }

       
    });
 
    

    


